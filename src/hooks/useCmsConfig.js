import { useState, useEffect } from 'react';
import { cmsGet } from '@/components/admin/cmsApi';

/**
 * Hook to fetch site-wide configuration from CMS
 * Fetches SiteConfig, NavbarConfig, FooterConfig, and LogoConfig in parallel
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

  useEffect(() => {
    const fetchConfig = async () => {
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

          setConfig({
            siteConfig,
            navbar,
            footer,
            logos,
          });
        }
      } catch (err) {
        console.error('Failed to fetch CMS config:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  return { config, loading, error };
}

/**
 * Hook to fetch a specific sheet from CMS
 */
export function useCmsSheet(sheetName, defaultValue = []) {
  const [data, setData] = useState(defaultValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await cmsGet('getSheet', { sheet: sheetName });
        if (result.success) {
          setData(result.rows || []);
        }
      } catch (err) {
        console.error(`Failed to fetch ${sheetName}:`, err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sheetName]);

  return { data, loading, error };
}