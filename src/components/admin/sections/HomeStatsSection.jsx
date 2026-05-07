import { useState, useEffect } from "react";
import { cmsGet, cmsPost } from "@/components/admin/cmsApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Save, Loader2 } from "lucide-react";

const defaultStats = [
  { value: "25+", label: "Years Experience", page: "home" },
  { value: "50+", label: "Major Projects", page: "home" },
  { value: "500+", label: "Security Audits", page: "home" },
  { value: "100%", label: "Client Satisfaction", page: "home" },
];

const iconOptions = [
  "Users", "Globe", "Shield", "Award", "Target", "Zap",
  "CheckCircle2", "BarChart3", "Search", "CheckCircle"
];

const HomeStatsSection = () => {
  const [stats, setStats] = useState(defaultStats);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await cmsGet('getSheet', { sheet: 'Stats' });
        if (result.success && result.data) {
          const homeStats = result.data.filter(
            s => (s.page || '').toLowerCase().trim() === 'home'
          );
          if (homeStats.length > 0) {
            setStats(homeStats);
          }
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (index, field, value) => {
    setStats(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value, page: 'home' };
      return updated;
    });
  };

  const addStat = () => {
    setStats(prev => [
      ...prev,
      { value: "0", label: "New Stat", page: "home" }
    ]);
  };

  const removeStat = (index) => {
    setStats(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Get all stats from CMS first
      const result = await cmsGet('getSheet', { sheet: 'Stats' });
      let allStats = [];
      if (result.success && result.data) {
        allStats = result.data.filter(
          s => (s.page || '').toLowerCase().trim() !== 'home'
        );
      }
      // Add home stats
      await cmsPost({
        action: 'saveSheet',
        sheet: 'Stats',
        rows: [...allStats, ...stats],
      });
      alert('Home stats saved successfully!');
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
        sheet: 'Stats',
        rows: stats,
      });
      alert('HomeStats sheet created with default data!');
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
        <h2 className="text-2xl font-bold">Home Page Stats Section</h2>
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
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="grid md:grid-cols-4 gap-4 items-center">
                <div>
                  <Label>Value (e.g., "25+")</Label>
                  <Input
                    value={stat.value || ''}
                    onChange={(e) => handleChange(index, 'value', e.target.value)}
                    placeholder="25+"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label>Label</Label>
                  <Input
                    value={stat.label || ''}
                    onChange={(e) => handleChange(index, 'label', e.target.value)}
                    placeholder="Years Experience"
                  />
                </div>
                <div className="flex items-center justify-end">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeStat(index)}
                    disabled={stats.length <= 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button variant="outline" onClick={addStat} className="w-full">
        <Plus className="h-4 w-4 mr-1" />
        Add New Stat
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl md:text-6xl font-bold gradient-text">
                  {stat.value}
                </div>
                <p className="mt-4 text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomeStatsSection;