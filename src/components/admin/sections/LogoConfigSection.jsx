import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2, Save, Plus, Trash2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { cmsGet, cmsPost } from "../cmsApi";
import ImageUploadField from "./ImageUploadField";

const LogoConfigSection = () => {
  const [logos, setLogos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({ type: 'main', src: '', alt: '', width: '140', height: '56' });
  const { toast } = useToast();

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await cmsGet('getSheet', { sheet: 'LogoConfig' });
      if (data.success) {
        setLogos(data.rows || []);
      } else {
        toast({ title: "Error", description: data.message || "Failed to fetch data.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Error", description: "Could not connect to CMS backend.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const result = await cmsPost({ action: 'saveSheet', sheet: 'LogoConfig', rows: logos });
      if (result.success) {
        toast({ title: "Saved!", description: "Logo configuration updated." });
      } else {
        toast({ title: "Error", description: result.message || "Save failed.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Error", description: "Could not save configuration.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const openAdd = () => {
    setFormData({ type: 'main', src: '', alt: 'MIPL Logo', width: '140', height: '56' });
    setEditIndex(null);
    setDialogOpen(true);
  };

  const openEdit = (logo, index) => {
    setFormData({ ...logo });
    setEditIndex(index);
    setDialogOpen(true);
  };

  const handleAdd = () => {
    setLogos([...logos, { ...formData, order: String(logos.length + 1) }]);
    setDialogOpen(false);
  };

  const handleUpdate = () => {
    const updated = [...logos];
    updated[editIndex] = formData;
    setLogos(updated);
    setDialogOpen(false);
  };

  const handleDelete = (index) => {
    setLogos(logos.filter((_, i) => i !== index));
  };

  if (loading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Logo Configuration</h2>
          <p className="text-muted-foreground mt-1">Manage website logos</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleSave} disabled={saving} className="bg-primary hover:bg-blue-600 text-primary-foreground">
            <Save className="h-4 w-4 mr-1" /> Save Changes
          </Button>
          <Button onClick={openAdd} className="bg-primary hover:bg-blue-600 text-primary-foreground">
            <Plus className="h-4 w-4 mr-1" /> Add Logo
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {logos.length === 0 ? (
          <div className="glass-card p-6 text-center text-muted-foreground">No logos configured.</div>
        ) : (
          logos.map((logo, index) => (
            <div key={index} className="glass-card p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium capitalize">{logo.type} Logo</span>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => openEdit(logo, index)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(index)} className="text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {logo.src && (
                <div className="mb-3 p-2 bg-muted/20 rounded-lg flex justify-center">
                  <img src={logo.src} alt={logo.alt} style={{ width: logo.width, height: logo.height }} />
                </div>
              )}
              <div className="text-xs text-muted-foreground space-y-1">
                <p>Alt: {logo.alt || '—'}</p>
                <p>Size: {logo.width} x {logo.height}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editIndex !== null ? 'Edit' : 'Add'} Logo</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2 overflow-y-auto flex-1 pr-1">
            <div className="space-y-1.5">
              <Label>Type</Label>
              <Input
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                placeholder="e.g., main, dark, favicon"
              />
            </div>
            <ImageUploadField
              label="Logo Image"
              value={formData.src}
              onChange={(url) => setFormData({ ...formData, src: url })}
              hint="Upload logo image file"
            />
            <div className="space-y-1.5">
              <Label>Alt Text</Label>
              <Input
                value={formData.alt}
                onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
                placeholder="MIPL Logo"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Width (px)</Label>
                <Input
                  type="number"
                  value={formData.width}
                  onChange={(e) => setFormData({ ...formData, width: e.target.value })}
                  placeholder="140"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Height (px)</Label>
                <Input
                  type="number"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  placeholder="56"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={editIndex !== null ? handleUpdate : handleAdd} className="bg-primary hover:bg-blue-600 text-primary-foreground">
              {editIndex !== null ? 'Update' : 'Add'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default LogoConfigSection;