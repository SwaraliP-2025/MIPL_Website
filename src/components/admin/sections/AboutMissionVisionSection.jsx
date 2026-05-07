import { useState, useEffect } from "react";
import { cmsGet, cmsPost } from "@/components/admin/cmsApi";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, Loader2, Plus } from "lucide-react";

const defaultMissionVision = {
  mission: "To empower organizations with cutting-edge security solutions and innovative technology that protect assets, enable growth, and build a safer digital future for all stakeholders.",
  vision: "To be the global leader in integrated security and smart city solutions, recognized for our innovation, integrity, and commitment to creating secure, intelligent environments.",
};

const AboutMissionVisionSection = () => {
  const [data, setData] = useState(defaultMissionVision);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await cmsGet('getSheet', { sheet: 'AboutMissionVision' });
        if (result.success && result.data && result.data.length > 0) {
          const mvData = result.data[0];
          if (mvData) setData({ ...defaultMissionVision, ...mvData });
        }
      } catch (error) {
        console.error('Error fetching mission/vision:', error);
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
        sheet: 'AboutMissionVision',
        rows: [data],
      });
      alert('Mission & Vision saved successfully!');
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
        sheet: 'AboutMissionVision',
        rows: [data],
      });
      alert('AboutMissionVision sheet created!');
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
        <h2 className="text-2xl font-bold">About Page - Mission & Vision</h2>
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

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="mission">Mission Statement</Label>
            <textarea
              id="mission"
              className="w-full min-h-[150px] p-3 border rounded-md bg-background mt-2"
              value={data.mission || ''}
              onChange={(e) => handleChange('mission', e.target.value)}
              placeholder="To empower organizations..."
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vision</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="vision">Vision Statement</Label>
            <textarea
              id="vision"
              className="w-full min-h-[150px] p-3 border rounded-md bg-background mt-2"
              value={data.vision || ''}
              onChange={(e) => handleChange('vision', e.target.value)}
              placeholder="To be the global leader..."
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">{data.mission}</p>
            </div>
            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">{data.vision}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutMissionVisionSection;