import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Loader2, Save, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { cmsGet, cmsPost } from "../cmsApi";

const NavbarConfigSection = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({ name: '', href: '', dropdown_items: '', order: '' });
  const { toast } = useToast();

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await cmsGet('getSheet', { sheet: 'NavbarConfig' });
      if (data.success) {
        setItems(data.rows || []);
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
      const result = await cmsPost({ action: 'saveSheet', sheet: 'NavbarConfig', rows: items });
      if (result.success) {
        toast({ title: "Saved!", description: "Navbar configuration updated." });
        fetchData();
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
    setFormData({ name: '', href: '', dropdown_items: '', order: String(items.length + 1) });
    setEditIndex(null);
    setDialogOpen(true);
  };

  const openEdit = (item, index) => {
    setFormData({ ...item, order: item.order || String(index + 1) });
    setEditIndex(index);
    setDialogOpen(true);
  };

  const handleAdd = () => {
    setItems([...items, { ...formData, order: formData.order || String(items.length + 1) }]);
    setDialogOpen(false);
  };

  const handleUpdate = () => {
    const updated = [...items];
    updated[editIndex] = { ...formData, order: formData.order || String(editIndex + 1) };
    setItems(updated);
    setDialogOpen(false);
  };

  const handleDelete = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const moveItem = (index, direction) => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === items.length - 1) return;
    const newItems = [...items];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]];
    newItems.forEach((item, i) => { item.order = String(i + 1); });
    setItems(newItems);
  };

  if (loading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Navbar Configuration</h2>
          <p className="text-muted-foreground mt-1">Manage navigation menu items and dropdowns</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleSave} disabled={saving} className="bg-primary hover:bg-blue-600 text-primary-foreground">
            <Save className="h-4 w-4 mr-1" /> Save Changes
          </Button>
          <Button onClick={openAdd} className="bg-primary hover:bg-blue-600 text-primary-foreground">
            <Plus className="h-4 w-4 mr-1" /> Add Item
          </Button>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-4 space-y-2">
          {items.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No navbar items configured.</div>
          ) : (
            items.map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                <span className="text-muted-foreground text-sm w-6">{index + 1}</span>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div>
                    <Label className="text-xs text-muted-foreground">Name</Label>
                    <div className="font-medium">{item.name}</div>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">URL</Label>
                    <div className="text-sm text-muted-foreground">{item.href}</div>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Dropdown</Label>
                    <div className="text-sm text-muted-foreground truncate">
                      {item.dropdown_items ? (
                        <span className="flex items-center gap-1">
                          <ChevronDown className="h-3 w-3" />
                          {item.dropdown_items.split(',').length} items
                        </span>
                      ) : (
                        <span className="text-xs">—</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" onClick={() => moveItem(index, 'up')} disabled={index === 0}>
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => moveItem(index, 'down')} disabled={index === items.length - 1}>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => openEdit(item, index)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(index)} className="text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editIndex !== null ? 'Edit' : 'Add'} Navbar Item</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label>Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., About"
              />
            </div>
            <div className="space-y-1.5">
              <Label>URL</Label>
              <Input
                value={formData.href}
                onChange={(e) => setFormData({ ...formData, href: e.target.value })}
                placeholder="e.g., /about"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Dropdown Items (comma-separated)</Label>
              <Input
                value={formData.dropdown_items}
                onChange={(e) => setFormData({ ...formData, dropdown_items: e.target.value })}
                placeholder="e.g., About MIPL,Our Achievements,Gallery"
              />
              <p className="text-xs text-muted-foreground">Leave empty for simple links</p>
            </div>
            <div className="space-y-1.5">
              <Label>Order</Label>
              <Input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                placeholder="Display order"
              />
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

export default NavbarConfigSection;