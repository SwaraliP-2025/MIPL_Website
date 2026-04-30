import { useState, useEffect } from "react";
import { cmsGet } from "@/components/admin/cmsApi";

/**
 * Fetches a sheet from the CMS backend.
 * Falls back to `fallback` data if fetch fails or sheet is empty.
 */
export function useCmsData(sheetName, fallback = []) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [fromCms, setFromCms] = useState(false);

  useEffect(() => {
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

  return { data, loading, fromCms };
}
