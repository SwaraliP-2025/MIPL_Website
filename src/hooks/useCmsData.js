import { useState, useEffect, useCallback } from "react";
import { cmsGet } from "@/components/admin/cmsApi";
import { subscribeToCacheInvalidation } from "@/lib/cmsCache";

/**
 * Fetches a sheet from the CMS backend.
 * Falls back to `fallback` data if fetch fails or sheet is empty.
 * Automatically refetches when CMS cache is invalidated (e.g. after admin saves).
 */
export function useCmsData(sheetName, fallback = []) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [fromCms, setFromCms] = useState(false);

  const fetchData = useCallback(() => {
    setLoading(true);
    cmsGet("getSheet", { sheet: sheetName })
      .then((res) => {
        if (res.success && res.rows && res.rows.length > 0) {
          setData(res.rows);
          setFromCms(true);
        }
        // Empty sheet → keep fallback
      })
      .catch(() => {
        // Network error → keep fallback silently
      })
      .finally(() => setLoading(false));
  }, [sheetName]);

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Refetch whenever CMS cache is invalidated
  useEffect(() => {
    const unsubscribe = subscribeToCacheInvalidation(() => {
      fetchData();
    });
    return unsubscribe;
  }, [fetchData]);

  return { data, loading, fromCms };
}
