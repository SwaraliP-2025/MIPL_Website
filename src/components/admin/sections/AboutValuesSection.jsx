import { useState, useEffect } from "react";
import { cmsGet, cmsPost } from "@/components/admin/cmsApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Save, Loader2 } from "lucide-react";

const defaultValues = [
  {
    icon: "Shield",
    title: "Integrity",
    description: "We uphold the highest ethical standards in all our engagements.",
  },
  {
    icon: "Target",
    title: "Excellence",
    description: "We strive for exceptional quality in every project we undertake.",
  },
  {
    icon: "Eye",
    title: "Transparency",
    description: "Open communication and honest reporting guide our client relationships.",
  },
  {
    icon: "TrendingUp",
    title: "Innovation",
    description: "We continuously evolve to stay ahead of emerging threats and technologies.",
  },
];

const iconOptions = ["Shield", "Target", "Eye", "Award", "Users", "Globe", "TrendingUp", "Zap", "CheckCircle2", "BarChart3", "Search", "CheckCircle"];

const AboutValuesSection = () => {
  const [values, setValues] = useState(defaultValues);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await cmsGet('getSheet', { sheet: 'AboutValues' });
        if (result.success && result.data && result.data.length > 0) {
          setValues(result.data);
        }
      } catch (error) {
        console.error('Error fetching values:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (index, field, value) => {
    setValues(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const addValue = () => {
    setValues(prev => [...prev, { icon: "Shield", title: "New Value", description: "Description here" }]);
  };

  const removeValue = (index) => {
    setValues(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await cmsPost({
        action: 'saveSheet',
        sheet: 'AboutValues',
        rows: values,
      });
      alert('Core values saved successfully!');
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
        sheet: 'AboutValues',
        rows: values,
      });
      alert('AboutValues sheet created!');
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
        <h2 className="text-2xl font-bold">About Page - Core Values</h2>
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
        {values.map((value, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div>
                  <Label>Icon Name</Label>
                  <select
                    className="w-full p-2 border rounded-md bg-background"
                    value={value.icon || 'Shield'}
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
                    value={value.title || ''}
                    onChange={(e) => handleChange(index, 'title', e.target.value)}
                    placeholder="Value Title"
                  />
                </div>
                <div className="md:col-span-1">
                  <Label>Description</Label>
                  <Input
                    value={value.description || ''}
                    onChange={(e) => handleChange(index, 'description', e.target.value)}
                    placeholder="Value description"
                  />
                </div>
                <div className="flex justify-end">
                  <Button variant="destructive" size="sm" onClick={() => removeValue(index)} disabled={values.length <= 1}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button variant="outline" onClick={addValue} className="w-full">
        <Plus className="h-4 w-4 mr-1" />
        Add New Value
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="p-6 text-center glass-card">
                <div className="inline-flex p-4 rounded-xl bg-white/5 text-primary mb-4">
                  <span className="text-lg font-bold">{value.icon}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutValuesSection;