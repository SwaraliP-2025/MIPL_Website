/**
 * CMS Cache Invalidation System
 * 
 * This module provides a simple cache invalidation mechanism using localStorage events.
 * When admin saves data, it triggers an invalidation event that causes all preview
 * components to refetch their data.
 */

const CACHE_KEY = 'cms_cache_version';
const INVALIDATION_EVENT = 'cms-cache-invalidated';

/**
 * Get current cache version
 */
export function getCacheVersion() {
  if (typeof window === 'undefined') return 0;
  return parseInt(localStorage.getItem(CACHE_KEY) || '0', 10);
}

/**
 * Invalidate the cache by incrementing version and dispatching event
 * Call this after successful CMS save operations
 */
export function invalidateCmsCache() {
  if (typeof window === 'undefined') return;
  
  const newVersion = getCacheVersion() + 1;
  localStorage.setItem(CACHE_KEY, String(newVersion));
  
  // Dispatch custom event for same-window updates
  window.dispatchEvent(new CustomEvent(INVALIDATION_EVENT, { 
    detail: { version: newVersion } 
  }));
  
  console.log('[CMS Cache] Invalidated - new version:', newVersion);
}

/**
 * Subscribe to cache invalidation events
 * Returns unsubscribe function
 */
export function subscribeToCacheInvalidation(callback) {
  if (typeof window === 'undefined') return () => {};
  
  const handler = (event) => {
    console.log('[CMS Cache] Invalidation detected, refetching...');
    callback(event.detail?.version);
  };
  
  // Listen to custom event (same window)
  window.addEventListener(INVALIDATION_EVENT, handler);
  
  // Listen to storage event (cross-window/tab)
  const storageHandler = (e) => {
    if (e.key === CACHE_KEY && e.newValue !== e.oldValue) {
      console.log('[CMS Cache] Cross-tab invalidation detected');
      callback(parseInt(e.newValue || '0', 10));
    }
  };
  window.addEventListener('storage', storageHandler);
  
  // Return cleanup function
  return () => {
    window.removeEventListener(INVALIDATION_EVENT, handler);
    window.removeEventListener('storage', storageHandler);
  };
}
