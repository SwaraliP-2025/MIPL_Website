import { useState, useEffect } from "react";
import { cmsGet, cmsPost } from "@/components/admin/cmsApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Save, Loader2 } from "lucide-react";
import ImageUploadField from "./ImageUploadField";

const defaultLogos = [
  { id: 1, name: "HPCL", logo: "/clients/hpcl-logo.png" },
  { id: 2, name: "IOCL", logo: "/clients/iocl-logo.png" },
  { id: 3, name: "BNP Paribas", logo: "/clients/bnp-paribas.jpg" },
  { id: 4, name: "Maharashtra Police", logo: "/clients/maharashtra-logo.png" },
  { id: 5, name: "JNPT", logo: "/clients/jnpt-logo.png" },
  { id: 6, name: "Gujarat Police", logo: "/clients/gujarat-police-logo.jpg" },
  { id: 7, name: "Nayara Energy", logo: "/clients/nayara-logo.jpg" },
  { id: 8, name: "MRPL", logo: "/clients/mrpl-logo.jpg" },
];

const ClientLogosSection = () => {
  const [logos, setLogos] = useState(defaultLogos);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await cmsGet('getSheet', { sheet: 'ClientLogos' });
        if (result.success && result.data && result.data.length > 0) {
          setLogos(result.data);
        }
      } catch (error) {
        console.error('Error fetching logos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (index, field, value) => {
    setLogos(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleImageChange = async (index, url) => {
    // Update local state
    handleChange(index, 'logo', url);
    // Auto-save to Google Sheets so the frontend reflects the change immediately
    try {
      const updated = logos.map((l, i) => i === index ? { ...l, logo: url } : l);
      await cmsPost({ action: 'saveSheet', sheet: 'ClientLogos', rows: updated });
    } catch (error) {
      console.error('Auto-save after upload failed:', error);
    }
  };

  const addLogo = () => {
    setLogos(prev => [...prev, { id: Date.now(), name: "New Client", logo: "" }]);
  };

  const removeLogo = (index) => {
    setLogos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await cmsPost({
        action: 'saveSheet',
        sheet: 'ClientLogos',
        rows: logos,
      });
      alert('Client logos saved successfully!');
    } catch (error) {
      alert('Error saving: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleInit = async () => {
    setSaving(true);
    try {
      await cmsPost({
        action: 'saveSheet',
        sheet: 'ClientLogos',
        rows: logos,
      });
      alert('ClientLogos sheet created!');
    } catch (error) {
      alert('Error initializing: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Client Logos (Home Page)</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleInit}>
            <Plus className="h-4 w-4 mr-1" />
            Initialize Sheet
          </Button>
          <Button onClick={handleSave} disabled={saving} className="bg-primary hover:bg-blue-600">
            {saving ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Save className="h-4 w-4 mr-1" />}
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {logos.map((logo, index) => (
          <Card key={logo.id || index}>
            <CardContent className="p-4">
              <div className="grid md:grid-cols-3 gap-4 items-center">
                <div>
                  <Label>Client Name</Label>
                  <Input
                    value={logo.name || ''}
                    onChange={(e) => handleChange(index, 'name', e.target.value)}
                    placeholder="Client Name"
                  />
                </div>
                <div>
                  <Label>Logo Image</Label>
                  <div className="flex items-center gap-2">
                    {logo.logo && (
                      <img src={logo.logo} alt={logo.name} className="w-12 h-12 object-contain rounded border" />
                    )}
                    <ImageUploadField
                      label=""
                      value={logo.logo || ''}
                      onChange={(url) => handleImageChange(index, url)}
                    />
                  </div>
                  <Input
                    className="mt-2"
                    value={logo.logo || ''}
                    onChange={(e) => handleChange(index, 'logo', e.target.value)}
                    placeholder="Or enter logo URL"
                  />
                </div>
                <div className="flex justify-end">
                  <Button variant="destructive" size="sm" onClick={() => removeLogo(index)} disabled={logos.length <= 1}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button variant="outline" onClick={addLogo} className="w-full">
        <Plus className="h-4 w-4 mr-1" />
        Add New Client Logo
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Preview (As shown on website)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
            {logos.map((logo, index) => (
              <div key={index} className="flex flex-col items-center justify-center p-6 rounded-xl bg-white dark:bg-white hover:bg-white/90 dark:hover:bg-white/90 transition-all group">
                <img
                  src={logo.logo}
                  alt={logo.name}
                  className="h-16 md:h-20 w-auto object-contain transition-all opacity-90 group-hover:opacity-100 group-hover:scale-110 mb-3"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <p className="text-xs text-center text-muted-foreground font-medium">
                  {logo.name}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientLogosSection;