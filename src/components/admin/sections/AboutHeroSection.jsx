import { useState, useEffect } from "react";
import { cmsGet, cmsPost } from "@/components/admin/cmsApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, Loader2, Plus } from "lucide-react";

const defaultAboutHero = {
  badgeText: "About MIPL",
  headline: "About MIPL",
  intro: "Maha Infotech Pvt. Ltd. (MIPL) is a consultancy company, focusing on delivering a wide range of advisory services in the field of Security Management & Information Technology. MIPL assists its Customers in reducing risks in the modern competitive scenarios using latest IT and Security tools & processes.",
};

const AboutHeroSection = () => {
  const [data, setData] = useState(defaultAboutHero);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await cmsGet('getSheet', { sheet: 'AboutHero' });
        if (result.success && result.data && result.data.length > 0) {
          const heroData = result.data[0];
          if (heroData) setData({ ...defaultAboutHero, ...heroData });
        }
      } catch (error) {
        console.error('Error fetching hero data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await cmsPost({
        action: 'saveSheet',
        sheet: 'AboutHero',
        rows: [data],
      });
      alert('About Hero saved successfully!');
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
        sheet: 'AboutHero',
        rows: [data],
      });
      alert('AboutHero sheet created!');
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
        <h2 className="text-2xl font-bold">About Page Hero Section</h2>
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

      <Card>
        <CardHeader>
          <CardTitle>Hero Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="badgeText">Badge Text</Label>
            <Input
              id="badgeText"
              value={data.badgeText || ''}
              onChange={(e) => handleChange('badgeText', e.target.value)}
              placeholder="About MIPL"
            />
          </div>

          <div>
            <Label htmlFor="headline">Headline</Label>
            <Input
              id="headline"
              value={data.headline || ''}
              onChange={(e) => handleChange('headline', e.target.value)}
              placeholder="About MIPL"
            />
          </div>

          <div>
            <Label htmlFor="intro">Introduction Text</Label>
            <textarea
              id="intro"
              className="w-full min-h-[120px] p-3 border rounded-md bg-background"
              value={data.intro || ''}
              onChange={(e) => handleChange('intro', e.target.value)}
              placeholder="Maha Infotech Pvt. Ltd. (MIPL) is a consultancy company..."
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-6 border rounded-lg">
            <span className="text-primary font-medium mb-4 block">{data.badgeText}</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{data.headline}</h1>
            <p className="text-xl text-muted-foreground">{data.intro}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutHeroSection;