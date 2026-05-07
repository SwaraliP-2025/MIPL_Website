import { useState, useEffect } from "react";
import { cmsGet, cmsPost } from "@/components/admin/cmsApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Save, Loader2 } from "lucide-react";

const defaultTestimonials = [
  {
    id: 1,
    quote: "MIPL's expertise in security management has transformed our operations. Their integrated approach and commitment to excellence are unmatched.",
    author: "Rajesh Kumar",
    company: "HPCL",
    role: "Security Director",
  },
  {
    id: 2,
    quote: "Working with MIPL was a game-changer for our organization. Their team delivered beyond our expectations.",
    author: "Priya Sharma",
    company: "Nayara Energy",
    role: "Operations Head",
  },
  {
    id: 3,
    quote: "The level of professionalism and technical expertise MIPL brings to the table is exceptional. Highly recommended!",
    author: "Amit Patel",
    company: "BNP Paribas",
    role: "Facilities Manager",
  },
];

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState(defaultTestimonials);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await cmsGet('getSheet', { sheet: 'Testimonials' });
        if (result.success && result.data && result.data.length > 0) {
          setTestimonials(result.data);
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (index, field, value) => {
    setTestimonials(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const addTestimonial = () => {
    setTestimonials(prev => [
      ...prev,
      { id: Date.now(), quote: "New testimonial quote", author: "Name", company: "Company", role: "Role" }
    ]);
  };

  const removeTestimonial = (index) => {
    setTestimonials(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await cmsPost({
        action: 'saveSheet',
        sheet: 'Testimonials',
        rows: testimonials,
      });
      alert('Testimonials saved successfully!');
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
        sheet: 'Testimonials',
        rows: testimonials,
      });
      alert('Testimonials sheet created!');
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
        <h2 className="text-2xl font-bold">Testimonials (Home Page)</h2>
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
        {testimonials.map((testimonial, index) => (
          <Card key={testimonial.id || index}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Testimonial #{index + 1}</span>
                <Button variant="destructive" size="sm" onClick={() => removeTestimonial(index)} disabled={testimonials.length <= 1}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Quote</Label>
                <textarea
                  className="w-full min-h-[80px] p-3 border rounded-md bg-background"
                  value={testimonial.quote || ''}
                  onChange={(e) => handleChange(index, 'quote', e.target.value)}
                  placeholder="Testimonial quote..."
                />
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label>Author Name</Label>
                  <Input
                    value={testimonial.author || ''}
                    onChange={(e) => handleChange(index, 'author', e.target.value)}
                    placeholder="Author Name"
                  />
                </div>
                <div>
                  <Label>Company</Label>
                  <Input
                    value={testimonial.company || ''}
                    onChange={(e) => handleChange(index, 'company', e.target.value)}
                    placeholder="Company Name"
                  />
                </div>
                <div>
                  <Label>Role</Label>
                  <Input
                    value={testimonial.role || ''}
                    onChange={(e) => handleChange(index, 'role', e.target.value)}
                    placeholder="Role/Position"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button variant="outline" onClick={addTestimonial} className="w-full">
        <Plus className="h-4 w-4 mr-1" />
        Add New Testimonial
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((t, index) => (
              <div key={index} className="p-6 glass-card">
                <p className="text-muted-foreground mb-4 italic">"{t.quote}"</p>
                <div className="font-semibold">{t.author}</div>
                <div className="text-sm text-muted-foreground">{t.role}, {t.company}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestimonialsSection;