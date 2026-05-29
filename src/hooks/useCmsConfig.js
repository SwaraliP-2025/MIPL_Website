import { useState, useEffect, useCallback } from 'react';
import { cmsGet } from '@/components/admin/cmsApi';
import { subscribeToCacheInvalidation } from '@/lib/cmsCache';

/**
 * Hook to fetch a single sheet from the CMS backend.
 * Automatically refetches when CMS cache is invalidated.
 */
export function useCmsSheet(sheetName, fallback = []) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(() => {
    setLoading(true);
    cmsGet('getSheet', { sheet: sheetName })
      .then((res) => {
        if (res.success && res.rows && res.rows.length > 0) {
          setData(res.rows);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [sheetName]);

  useEffect(() => { fetchData(); }, [fetchData]);

  useEffect(() => {
    const unsubscribe = subscribeToCacheInvalidation(() => { fetchData(); });
    return unsubscribe;
  }, [fetchData]);

  return { data, loading };
}

/**
 * Hook to fetch site-wide configuration from CMS
 * Fetches SiteConfig, NavbarConfig, FooterConfig, and LogoConfig in parallel.
 * Automatically refetches when CMS cache is invalidated (e.g. after admin saves).
 */
export function useCmsConfig() {
  const [config, setConfig] = useState({
    siteConfig: {},
    navbar: [],
    footer: {},
    logos: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchConfig = useCallback(async () => {
    try {
      const data = await cmsGet('getAllContent');
      if (data.success && data.content) {
        // Process SiteConfig
        const siteConfig = {};
        (data.content.SiteConfig || []).forEach(row => {
          if (row.key) siteConfig[row.key] = row.value || '';
        });

        // Process NavbarConfig
        const navbar = (data.content.NavbarConfig || []).sort((a, b) =>
          parseInt(a.order || 99) - parseInt(b.order || 99)
        );

        // Process FooterConfig
        const footer = {};
        (data.content.FooterConfig || []).forEach(row => {
          const key = `${row.section}_${row.key}`;
          footer[key] = row.value || '';
        });

        // Process LogoConfig
        const logos = (data.content.LogoConfig || []).sort((a, b) =>
          parseInt(a.order || 99) - parseInt(b.order || 99)
        );

        setConfig({ siteConfig, navbar, footer, logos });
      }
    } catch (err) {
      console.error('Failed to fetch CMS config:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch - only run once
  useEffect(() => {
    fetchConfig();
  }, []); // Empty dependency array - run only once on mount

  // Refetch whenever CMS cache is invalidated
  useEffect(() => {
    const unsubscribe = subscribeToCacheInvalidation(() => {
      fetchConfig();
    });
    return unsubscribe;
  }, [fetchConfig]);

  return { config, loading, error };
}
