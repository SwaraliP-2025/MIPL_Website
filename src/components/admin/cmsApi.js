import { invalidateCmsCache } from "@/lib/cmsCache";

// CMS backend URL (Google Apps Script for data)
const CMS_URL = "https://script.google.com/macros/s/AKfycbxjsuEbtH40MWvzsBkKH0wLMyLZZL25Y3UGymGx_lzEMNgcgOrM0mnGRkWI2jeQMd_X4w/exec";

// Hostinger image upload endpoint
const HOSTINGER_UPLOAD_URL = "https://consultmipl.com/hostinger-upload/upload.php";

// Simple in-memory cache with TTL
const requestCache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getCacheKey(action, params) {
  return `${action}:${JSON.stringify(params)}`;
}

function getCachedResult(key) {
  const cached = requestCache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  requestCache.delete(key);
  return null;
}

function setCachedResult(key, data) {
  requestCache.set(key, { data, timestamp: Date.now() });
}

// Keep localStorage in sync so the admin panel login form works
if (typeof window !== "undefined") {
  localStorage.setItem("cms_api_url", CMS_URL);
}

export function getCmsUrl() {
  return CMS_URL;
}

export async function cmsGet(action, params = {}) {
  const cacheKey = getCacheKey(action, params);
  
  // Check cache first
  const cached = getCachedResult(cacheKey);
  if (cached) {
    return cached;
  }

  const query = new URLSearchParams({ action, ...params }).toString();
  const res = await fetch(`${CMS_URL}?${query}`);
  const data = await res.json();
  
  // Cache successful responses
  if (data.success) {
    setCachedResult(cacheKey, data);
  }
  
  return data;
}

export async function cmsPost(body) {
  const token = localStorage.getItem("cms_token") || "";
  // Google Apps Script requires Content-Type text/plain for JSON POST
  const res = await fetch(CMS_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify({ ...body, token }),
    redirect: "follow",
  });
  const result = await res.json();
  
  // Invalidate cache on successful write operations
  if (result.success && isWriteOperation(body.action)) {
    invalidateCmsCache();
    // Also clear local cache
    requestCache.clear();
  }
  
  return result;
}

/**
 * Check if an action is a write operation that should invalidate cache
 */
function isWriteOperation(action) {
  const writeActions = ['saveSheet', 'saveRow', 'addRow', 'deleteRow', 'initSheets'];
  return writeActions.includes(action);
}

/**
 * Upload an image File object to Hostinger hosting via the CMS backend.
 * Returns { success, url } where url is a public URL usable as <img src>.
 */
export async function cmsUploadImage(file) {
  const formData = new FormData();
  formData.append('image', file);

  const res = await fetch(HOSTINGER_UPLOAD_URL, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    throw new Error(`Upload failed: ${res.statusText}`);
  }

  return res.json();
}
