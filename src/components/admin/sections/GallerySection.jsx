import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Loader2, AlertCircle, RefreshCw, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { cmsGet, cmsPost } from "../cmsApi";
import ImageUploadField from "./ImageUploadField";

const CATEGORIES = ['Awards', 'Events', 'Team', 'Projects'];

const emptyRow = () => ({ id: '', category: '', title: '', description: '', image: '', date: '' });

const GallerySection = () => {
  const [rows, setRows]               = useState([]);
  const [loading, setLoading]         = useState(true);
  const [saving, setSaving]           = useState(false);
  const [dialogOpen, setDialogOpen]   = useState(false);
  const [editIndex, setEditIndex]     = useState(null);
  const [formData, setFormData]       = useState(emptyRow());
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const { toast } = useToast();

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await cmsGet('getSheet', { sheet: 'Gallery' });
      if (data.success) setRows(data.rows || []);
      else toast({ title: 'Error', description: data.message, variant: 'destructive' });
    } catch {
      toast({ title: 'Error', description: 'Could not connect to CMS backend.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const openAdd = () => {
    setFormData(emptyRow());
    setEditIndex(null);
    setDialogOpen(true);
  };

  const openEdit = (row, index) => {
    setFormData({ ...row });
    setEditIndex(index);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const action = editIndex !== null ? 'saveRow' : 'addRow';
      const body = { action, sheet: 'Gallery', row: formData };
      if (editIndex !== null) body.rowIndex = editIndex;

      const result = await cmsPost(body);
      if (result.success) {
        toast({ title: 'Saved!', description: `Gallery item ${editIndex !== null ? 'updated' : 'added'}.` });
        setDialogOpen(false);
        fetchData();
      } else {
        toast({ title: 'Error', description: result.message || 'Save failed.', variant: 'destructive' });
      }
    } catch {
      toast({ title: 'Error', description: 'Could not save.', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (index) => {
    try {
      const result = await cmsPost({ action: 'deleteRow', sheet: 'Gallery', rowIndex: index });
      if (result.success) {
        toast({ title: 'Deleted', description: 'Gallery item removed.' });
        setDeleteConfirm(null);
        fetchData();
      } else {
        toast({ title: 'Error', description: result.message, variant: 'destructive' });
      }
    } catch {
      toast({ title: 'Error', description: 'Could not delete.', variant: 'destructive' });
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Gallery</h2>
          <p className="text-muted-foreground mt-1">Manage gallery images. Upload images directly — they are stored on Google Drive.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={fetchData}><RefreshCw className="h-4 w-4 mr-1" /> Refresh</Button>
          <Button size="sm" onClick={openAdd} className="bg-primary hover:bg-blue-600 text-primary-foreground">
            <Plus className="h-4 w-4 mr-1" /> Add Item
          </Button>
        </div>
      </div>

      {rows.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No gallery items yet.</p>
          <Button size="sm" onClick={openAdd} className="mt-4 bg-primary hover:bg-blue-600 text-primary-foreground">
            <Plus className="h-4 w-4 mr-1" /> Add First Item
          </Button>
        </div>
      ) : (
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead className="w-16">Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-muted-foreground">{i + 1}</TableCell>
                    <TableCell>
                      {row.image ? (
                        <img src={row.image} alt={row.title} className="w-12 h-10 object-cover rounded" />
                      ) : (
                        <div className="w-12 h-10 bg-muted rounded flex items-center justify-center">
                          <Image className="h-4 w-4 text-muted-foreground" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate font-medium">{row.title || '—'}</TableCell>
                    <TableCell>{row.category || '—'}</TableCell>
                    <TableCell>{row.date || '—'}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="sm" onClick={() => openEdit(row, i)}><Pencil className="h-3.5 w-3.5" /></Button>
                        <Button variant="ghost" size="sm" onClick={() => setDeleteConfirm(i)} className="text-destructive hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {/* Add / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editIndex !== null ? 'Edit' : 'Add'} Gallery Item</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2 overflow-y-auto flex-1 pr-1">

            {/* Image Upload */}
            <ImageUploadField
              label="Gallery Image"
              value={formData.image}
              onChange={(url) => setFormData({ ...formData, image: url })}
              hint="Upload gallery photo file"
            />

            <div className="space-y-1.5">
              <Label>Title</Label>
              <Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
                placeholder="e.g. Annual Security Summit" className="bg-white/5 border-2 border-black/20 dark:border-white/10" />
            </div>

            <div className="space-y-1.5">
              <Label>Category</Label>
              <Select value={formData.category} onValueChange={v => setFormData({...formData, category: v})}>
                <SelectTrigger className="bg-white/5 border-2 border-black/20 dark:border-white/10">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label>Description</Label>
              <Textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                placeholder="Brief description..." className="bg-white/5 border-2 border-black/20 dark:border-white/10" rows={2} />
            </div>

            <div className="space-y-1.5">
              <Label>Date / Year</Label>
              <Input value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})}
                placeholder="e.g. 2025" className="bg-white/5 border-2 border-black/20 dark:border-white/10" />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving} className="bg-primary hover:bg-blue-600 text-primary-foreground">
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : null}
              {saving ? 'Saving...' : editIndex !== null ? 'Update' : 'Add'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <Dialog open={deleteConfirm !== null} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>Confirm Delete</DialogTitle></DialogHeader>
          <p className="text-muted-foreground">Delete this gallery item? This cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
            <Button variant="destructive" onClick={() => handleDelete(deleteConfirm)}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default GallerySection;
