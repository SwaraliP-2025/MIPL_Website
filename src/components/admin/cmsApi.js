// Hardcoded CMS backend URL
//new by mistake deployed url after running seedalldata: https://script.google.com/macros/s/AKfycbxzzeWN9n2BCHRMPGAtiCD8UjaNs3cpbRbQuFNFK2UDqAyjuukJMoSiAZEqX0tyKpua8Q/exec
const CMS_URL = "https://script.google.com/macros/s/AKfycbxjsuEbtH40MWvzsBkKH0wLMyLZZL25Y3UGymGx_lzEMNgcgOrM0mnGRkWI2jeQMd_X4w/exec";

// Keep localStorage in sync so the admin panel login form works
if (typeof window !== "undefined") {
  localStorage.setItem("cms_api_url", CMS_URL);
}

export function getCmsUrl() {
  return CMS_URL;
}

export async function cmsGet(action, params = {}) {
  const query = new URLSearchParams({ action, ...params }).toString();
  const res = await fetch(`${CMS_URL}?${query}`);
  return res.json();
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
  return res.json();
}

/**
 * Upload an image File object to Google Drive via the CMS backend.
 * Returns { success, url } where url is a public Drive link usable as <img src>.
 */
export async function cmsUploadImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        // Strip the data:image/...;base64, prefix
        const base64 = e.target.result.split(',')[1];
        const result = await cmsPost({
          action: 'uploadImage',
          fileName: file.name,
          fileData: base64,
          mimeType: file.type || 'image/jpeg',
        });
        resolve(result);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
