import { useState, useEffect } from "react";
import { cmsGet, cmsPost } from "@/components/admin/cmsApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Save, Loader2 } from "lucide-react";

const defaultHighlights = [
  {
    icon: "Trophy",
    title: "3x International Finalist",
    description: "Security Excellence Awards, London (2014, 2015, 2017)",
  },
  {
    icon: "Star",
    title: "Industry Pioneer",
    description: "First C&C system in Indian refinery sector",
  },
  {
    icon: "Target",
    title: "Scale Leader",
    description: "Largest biometric project in India",
  },
  {
    icon: "CheckCircle",
    title: "Government Trust",
    description: "Supreme Court-mandated implementations",
  },
];

const iconOptions = ["Trophy", "Star", "Target", "CheckCircle", "Award", "Shield", "Users", "Globe", "TrendingUp", "Zap", "CheckCircle2", "BarChart3"];

const AchievementsHighlightsSection = () => {
  const [highlights, setHighlights] = useState(defaultHighlights);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await cmsGet('getSheet', { sheet: 'AchievementsHighlights' });
        if (result.success && result.data && result.data.length > 0) {
          setHighlights(result.data);
        }
      } catch (error) {
        console.error('Error fetching highlights:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (index, field, value) => {
    setHighlights(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const addHighlight = () => {
    setHighlights(prev => [...prev, { icon: "Trophy", title: "New Highlight", description: "Description here" }]);
  };

  const removeHighlight = (index) => {
    setHighlights(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await cmsPost({
        action: 'saveSheet',
        sheet: 'AchievementsHighlights',
        rows: highlights,
      });
      alert('Highlights saved successfully!');
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
        sheet: 'AchievementsHighlights',
        rows: highlights,
      });
      alert('AchievementsHighlights sheet created!');
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
        <h2 className="text-2xl font-bold">Achievements Page - Highlights</h2>
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
        {highlights.map((highlight, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div>
                  <Label>Icon Name</Label>
                  <select
                    className="w-full p-2 border rounded-md bg-background"
                    value={highlight.icon || 'Trophy'}
                    onChange={(e) => handleChange(index, 'icon', e.target.value)}
                  >
                    {iconOptions.map(icon => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label>Title</Label>
                  <Input
                    value={highlight.title || ''}
                    onChange={(e) => handleChange(index, 'title', e.target.value)}
                    placeholder="Highlight Title"
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Input
                    value={highlight.description || ''}
                    onChange={(e) => handleChange(index, 'description', e.target.value)}
                    placeholder="Highlight description"
                  />
                </div>
                <div className="flex justify-end">
                  <Button variant="destructive" size="sm" onClick={() => removeHighlight(index)} disabled={highlights.length <= 1}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button variant="outline" onClick={addHighlight} className="w-full">
        <Plus className="h-4 w-4 mr-1" />
        Add New Highlight
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((highlight, index) => (
              <div key={index} className="p-6 text-center glass-card">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-sm">{highlight.icon}</span>
                </div>
                <h3 className="font-bold mb-2">{highlight.title}</h3>
                <p className="text-sm text-muted-foreground">{highlight.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AchievementsHighlightsSection;