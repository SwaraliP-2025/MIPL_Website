import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cmsGet, cmsPost } from "../cmsApi";

const sections = ['company', 'quicklinks', 'services', 'contact', 'bottom'];

const FooterConfigSection = () => {
  const [config, setConfig] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      try {
        const data = await cmsGet('getSheet', { sheet: 'FooterConfig' });
        if (data.success && data.rows) {
          const obj = {};
          data.rows.forEach(row => {
            const key = `${row.section}_${row.key}`;
            obj[key] = row.value;
          });
          setConfig(obj);
        }
      } catch {
        toast({ title: "Error", description: "Failed to load footer config.", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const rows = [];
      Object.entries(config).forEach(([key, value]) => {
        const [section, field] = key.split('_');
        rows.push({ section, key: field, value, order: 0 });
      });
      const result = await cmsPost({ action: 'saveSheet', sheet: 'FooterConfig', rows });
      if (result.success) {
        toast({ title: "Saved!", description: "Footer configuration updated." });
      } else {
        toast({ title: "Error", description: result.message || "Save failed.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Error", description: "Could not save configuration.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const updateConfig = (key, value) => {
    setConfig({ ...config, [key]: value });
  };

  if (loading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Footer Configuration</h2>
          <p className="text-muted-foreground mt-1">Manage footer content, links, and contact info</p>
        </div>
        <Button onClick={handleSave} disabled={saving} className="bg-primary hover:bg-blue-600 text-primary-foreground">
          <Save className="h-4 w-4 mr-1" /> Save Changes
        </Button>
      </div>

      <div className="space-y-6">
        {/* Company Section */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4">Company Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Description</Label>
              <Textarea
                value={config.company_description || ''}
                onChange={(e) => updateConfig('company_description', e.target.value)}
                placeholder="Company description"
                rows={3}
              />
            </div>
            <div className="space-y-1.5">
              <Label>LinkedIn URL</Label>
              <Input
                value={config.company_linkedin_url || ''}
                onChange={(e) => updateConfig('company_linkedin_url', e.target.value)}
                placeholder="LinkedIn profile URL"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Twitter/X URL</Label>
              <Input
                value={config.company_twitter_url || ''}
                onChange={(e) => updateConfig('company_twitter_url', e.target.value)}
                placeholder="Twitter profile URL"
              />
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="grid grid-cols-2 gap-2">
                <div className="space-y-1.5">
                  <Label>Link {i} Name</Label>
                  <Input
                    value={config[`quicklinks_link_${i}_name`] || ''}
                    onChange={(e) => updateConfig(`quicklinks_link_${i}_name`, e.target.value)}
                    placeholder="Link name"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Link {i} URL</Label>
                  <Input
                    value={config[`quicklinks_link_${i}_href`] || ''}
                    onChange={(e) => updateConfig(`quicklinks_link_${i}_href`, e.target.value)}
                    placeholder="/path"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4">Services Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="grid grid-cols-2 gap-2">
                <div className="space-y-1.5">
                  <Label>Service {i} Name</Label>
                  <Input
                    value={config[`services_service_${i}_name`] || ''}
                    onChange={(e) => updateConfig(`services_service_${i}_name`, e.target.value)}
                    placeholder="Service name"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Service {i} URL</Label>
                  <Input
                    value={config[`services_service_${i}_href`] || ''}
                    onChange={(e) => updateConfig(`services_service_${i}_href`, e.target.value)}
                    placeholder="/path"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input
                value={config.contact_email || ''}
                onChange={(e) => updateConfig('contact_email', e.target.value)}
                placeholder="info@consultmipl.com"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Phone</Label>
              <Input
                value={config.contact_phone || ''}
                onChange={(e) => updateConfig('contact_phone', e.target.value)}
                placeholder="+91 98213 01414"
              />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label>Locations</Label>
              <Input
                value={config.contact_locations || ''}
                onChange={(e) => updateConfig('contact_locations', e.target.value)}
                placeholder="Thane – Chhatrapati Sambhajinagar – Navi Mumbai – Dubai"
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4">Bottom Bar</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Copyright Text</Label>
              <Input
                value={config.bottom_copyright_text || ''}
                onChange={(e) => updateConfig('bottom_copyright_text', e.target.value)}
                placeholder="© 2026 Company Name"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Privacy Policy URL</Label>
              <Input
                value={config.bottom_privacy_href || ''}
                onChange={(e) => updateConfig('bottom_privacy_href', e.target.value)}
                placeholder="/privacy"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Terms URL</Label>
              <Input
                value={config.bottom_terms_href || ''}
                onChange={(e) => updateConfig('bottom_terms_href', e.target.value)}
                placeholder="/terms"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FooterConfigSection;