import { useState, useEffect } from "react";
import { cmsGet, cmsPost } from "@/components/admin/cmsApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Save, Loader2 } from "lucide-react";

const defaultHeroData = {
  badgeText: "Award-Winning Security & IT Consultancy from India",
  headline: "Securing India's Critical Infrastructure Since 2000",
  subheadline: "Award-winning security & IT consulting with end-to-end capabilities. From design to implementation, we deliver sustainable solutions for complex, integrated security management projects across government, energy, and enterprise sectors.",
  ctaPrimaryText: "Book Appointment",
  ctaPrimaryLink: "/contact",
  ctaSecondaryText: "View Services",
  ctaSecondaryLink: "/services",
};

const HomeHeroSection = () => {
  const [data, setData] = useState(defaultHeroData);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await cmsGet('getSheet', { sheet: 'HomeHero' });
        if (result.success && result.data && result.data.length > 0) {
          const heroData = result.data[0];
          if (heroData) setData({ ...defaultHeroData, ...heroData });
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
        sheet: 'HomeHero',
        rows: [data],
      });
      alert('Hero content saved successfully!');
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
        sheet: 'HomeHero',
        rows: [data],
      });
      alert('HomeHero sheet created with default data!');
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
        <h2 className="text-2xl font-bold">Home Page Hero Section</h2>
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
          <div className="grid gap-4">
            <div>
              <Label htmlFor="badgeText">Badge Text</Label>
              <Input
                id="badgeText"
                value={data.badgeText || ''}
                onChange={(e) => handleChange('badgeText', e.target.value)}
                placeholder="Award-Winning Security & IT Consultancy from India"
              />
            </div>

            <div>
              <Label htmlFor="headline">Headline</Label>
              <Input
                id="headline"
                value={data.headline || ''}
                onChange={(e) => handleChange('headline', e.target.value)}
                placeholder="Securing India's Critical Infrastructure Since 2000"
              />
            </div>

            <div>
              <Label htmlFor="subheadline">Sub-headline</Label>
              <textarea
                id="subheadline"
                className="w-full min-h-[100px] p-3 border rounded-md bg-background"
                value={data.subheadline || ''}
                onChange={(e) => handleChange('subheadline', e.target.value)}
                placeholder="Award-winning security & IT consulting..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ctaPrimaryText">Primary CTA Text</Label>
                <Input
                  id="ctaPrimaryText"
                  value={data.ctaPrimaryText || ''}
                  onChange={(e) => handleChange('ctaPrimaryText', e.target.value)}
                  placeholder="Book Appointment"
                />
              </div>
              <div>
                <Label htmlFor="ctaPrimaryLink">Primary CTA Link</Label>
                <Input
                  id="ctaPrimaryLink"
                  value={data.ctaPrimaryLink || ''}
                  onChange={(e) => handleChange('ctaPrimaryLink', e.target.value)}
                  placeholder="/contact"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ctaSecondaryText">Secondary CTA Text</Label>
                <Input
                  id="ctaSecondaryText"
                  value={data.ctaSecondaryText || ''}
                  onChange={(e) => handleChange('ctaSecondaryText', e.target.value)}
                  placeholder="View Services"
                />
              </div>
              <div>
                <Label htmlFor="ctaSecondaryLink">Secondary CTA Link</Label>
                <Input
                  id="ctaSecondaryLink"
                  value={data.ctaSecondaryLink || ''}
                  onChange={(e) => handleChange('ctaSecondaryLink', e.target.value)}
                  placeholder="/services"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-6 border rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 mb-8">
              <span className="text-sm font-medium text-primary">{data.badgeText}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">{data.headline}</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-10">{data.subheadline}</p>
            <div className="flex gap-4">
              <Button className="bg-primary">{data.ctaPrimaryText}</Button>
              <Button variant="outline">{data.ctaSecondaryText}</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomeHeroSection;