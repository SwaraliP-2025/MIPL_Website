import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Loader2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cmsGet, cmsPost } from "../cmsApi";
import ImageUploadField from "./ImageUploadField";

const configKeys = [
  { key: 'company_name', label: 'Company Name' },
  { key: 'tagline', label: 'Tagline' },
  { key: 'address', label: 'Address', type: 'textarea' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'website', label: 'Website' },
  { key: 'linkedin', label: 'LinkedIn URL' },
  { key: 'twitter', label: 'Twitter URL' },
  { key: 'footer_text', label: 'Footer Text', type: 'textarea' },
  { key: 'about_intro', label: 'About Introduction', type: 'textarea' },
  { key: 'about_image', label: 'About Page Image', type: 'image' },
  { key: 'hero_cta_text', label: 'Hero CTA Text' },
  { key: 'hero_cta_link', label: 'Hero CTA Link' },
];

const SiteConfigSection = () => {
  const [config, setConfig] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      try {
        const data = await cmsGet('getSheet', { sheet: 'SiteConfig' });
        if (data.success && data.rows) {
          const obj = {};
          data.rows.forEach(r => { if (r.key) obj[r.key] = r.value || ''; });
          setConfig(obj);
        }
      } catch {
        toast({ title: "Error", description: "Failed to load site config.", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const rows = Object.entries(config).map(([key, value]) => ({ key, value }));
      const result = await cmsPost({ action: 'saveSheet', sheet: 'SiteConfig', rows });
      if (result.success) {
        toast({ title: "Saved!", description: "Site configuration updated." });
      } else {
        toast({ title: "Error", description: result.message || "Save failed.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Error", description: "Could not save configuration.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Site Configuration</h2>
          <p className="text-muted-foreground mt-1">Global settings for the MIPL website</p>
        </div>
        <Button onClick={handleSave} disabled={saving} className="bg-primary hover:bg-blue-600 text-primary-foreground">
          {saving ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Save className="h-4 w-4 mr-1" />}
          Save All
        </Button>
      </div>

      <div className="glass-card p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {configKeys.map(item => (
            <div key={item.key} className={`space-y-1.5 ${item.type === 'textarea' || item.type === 'image' ? 'md:col-span-2' : ''}`}>
              <Label>{item.label}</Label>
              {item.type === 'textarea' ? (
                <Textarea
                  value={config[item.key] || ''}
                  onChange={(e) => setConfig({ ...config, [item.key]: e.target.value })}
                  className="bg-white/5 border-2 border-black/20 dark:border-white/10"
                  rows={3}
                />
              ) : item.type === 'image' ? (
                <ImageUploadField
                  label=""
                  value={config[item.key] || ''}
                  onChange={(url) => setConfig({ ...config, [item.key]: url })}
                />
              ) : (
                <Input
                  value={config[item.key] || ''}
                  onChange={(e) => setConfig({ ...config, [item.key]: e.target.value })}
                  className="bg-white/5 border-2 border-black/20 dark:border-white/10"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SiteConfigSection;
