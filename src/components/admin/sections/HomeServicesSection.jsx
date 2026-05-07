import { useState, useEffect } from "react";
import { cmsGet, cmsPost } from "@/components/admin/cmsApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Save, Loader2, X } from "lucide-react";
import ImageUploadField from "./ImageUploadField";

const defaultServices = [
  {
    id: 1,
    iconImage: "sec_cons.png",
    title: "Security Consultancy",
    description: "MIPL is the consultant of choice for several large organisations for designing and managing enterprise-class security technology solutions.",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: 2,
    iconImage: "secaudit.png",
    title: "Security Audits",
    description: "MIPL conducts risk analysis and security audits using TRAVA. It detects if there are any vulnerabilities in the hardware or software.",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: 3,
    iconImage: "egov.png",
    title: "eGovernance Consultancy",
    description: "MIPL provides unparalleled expertise in designing security & eGovernance programs with its two decades of experience.",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    id: 4,
    iconImage: "smartcity.png",
    title: "Smart City",
    description: "MIPL can work with municipal bodies in designing, implementing and maintaining a Smart City with high grade video surveillance.",
    gradient: "from-orange-500/20 to-amber-500/20",
  },
  {
    id: 5,
    iconImage: "sectrain.png",
    title: "Security Training",
    description: "MIPL can provide handholding and training programs related to generic technology as well as during specific project implementation.",
    gradient: "from-red-500/20 to-rose-500/20",
  },
  {
    id: 6,
    iconImage: "safecity.png",
    title: "Safe City",
    description: "MIPL can design and implement an all-inclusive and integrated security management system for an entire city.",
    gradient: "from-indigo-500/20 to-violet-500/20",
  },
];

const gradients = [
  "from-blue-500/20 to-cyan-500/20",
  "from-purple-500/20 to-pink-500/20",
  "from-green-500/20 to-emerald-500/20",
  "from-orange-500/20 to-amber-500/20",
  "from-red-500/20 to-rose-500/20",
  "from-indigo-500/20 to-violet-500/20",
];

const HomeServicesSection = () => {
  const [services, setServices] = useState(defaultServices);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await cmsGet('getSheet', { sheet: 'HomeServices' });
        if (result.success && result.data && result.data.length > 0) {
          setServices(result.data);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (index, field, value) => {
    setServices(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleImageChange = async (index, url) => {
    // Update local state
    handleChange(index, 'iconImage', url);
    // Auto-save to Google Sheets so the frontend reflects the change immediately
    try {
      const updated = services.map((s, i) => i === index ? { ...s, iconImage: url } : s);
      await cmsPost({ action: 'saveSheet', sheet: 'HomeServices', rows: updated });
    } catch (error) {
      console.error('Auto-save after upload failed:', error);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await cmsPost({
        action: 'saveSheet',
        sheet: 'HomeServices',
        rows: services,
      });
      alert('Home services saved successfully!');
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
        sheet: 'HomeServices',
        rows: services,
      });
      alert('HomeServices sheet created with default data!');
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
        <h2 className="text-2xl font-bold">Home Page Services Grid</h2>
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

      <div className="grid gap-6">
        {services.map((service, index) => (
          <Card key={service.id || index}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Service #{index + 1}</span>
                <span className="text-sm font-normal text-muted-foreground">
                  Gradient: {service.gradient}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Service Title</Label>
                  <Input
                    value={service.title || ''}
                    onChange={(e) => handleChange(index, 'title', e.target.value)}
                    placeholder="Service Title"
                  />
                </div>
                <div>
                  <Label>Gradient Style</Label>
                  <select
                    className="w-full p-2 border rounded-md bg-background"
                    value={service.gradient || ''}
                    onChange={(e) => handleChange(index, 'gradient', e.target.value)}
                  >
                    {gradients.map((g, i) => (
                      <option key={i} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <Label>Description</Label>
                <textarea
                  className="w-full min-h-[80px] p-3 border rounded-md bg-background"
                  value={service.description || ''}
                  onChange={(e) => handleChange(index, 'description', e.target.value)}
                  placeholder="Service description..."
                />
              </div>

              <div>
                <Label>Icon Image</Label>
                <div className="flex items-center gap-4">
                  {service.iconImage && (
                    <img
                      src={service.iconImage}
                      alt={service.title}
                      className="w-16 h-16 object-contain rounded-lg border"
                    />
                  )}
                  <ImageUploadField
                    label=""
                    value={service.iconImage || ''}
                    onChange={(url) => handleImageChange(index, url)}
                  />
                </div>
                <Input
                  className="mt-2"
                  value={service.iconImage || ''}
                  onChange={(e) => handleChange(index, 'iconImage', e.target.value)}
                  placeholder="Or enter image URL directly"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.slice(0, 3).map((service) => (
              <div key={service.title} className="p-6 rounded-xl glass-card">
                <div className="mb-4 flex justify-center">
                  <div className="p-4 rounded-xl bg-white/5">
                    <img
                      src={service.iconImage}
                      alt={service.title}
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-center mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground text-justify">
                  {service.description.substring(0, 100)}...
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomeServicesSection;