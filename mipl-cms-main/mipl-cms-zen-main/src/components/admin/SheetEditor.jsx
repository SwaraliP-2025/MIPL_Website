import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { cmsGet, cmsPost } from "./cmsApi";

const SheetEditor = ({ sheetName, title, description, columns }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const { toast } = useToast();

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await cmsGet('getSheet', { sheet: sheetName });
      if (data.success) {
        setRows(data.rows || []);
      } else {
        toast({ title: "Error", description: data.message || "Failed to fetch data.", variant: "destructive" });
      }
    } catch (err) {
      toast({ title: "Error", description: "Could not connect to CMS backend.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [sheetName]);

  const openAdd = () => {
    const empty = {};
    columns.forEach(c => { empty[c.key] = ''; });
    setFormData(empty);
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
      const body = { action, sheet: sheetName, row: formData };
      if (editIndex !== null) body.rowIndex = editIndex;
      const result = await cmsPost(body);
      if (result.success) {
        toast({ title: "Saved!", description: `Row ${editIndex !== null ? 'updated' : 'added'} successfully.` });
        setDialogOpen(false);
        fetchData();
      } else {
        toast({ title: "Error", description: result.message || "Save failed.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Error", description: "Could not save data.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (index) => {
    try {
      const result = await cmsPost({ action: 'deleteRow', sheet: sheetName, rowIndex: index });
      if (result.success) {
        toast({ title: "Deleted", description: "Row removed successfully." });
        setDeleteConfirm(null);
        fetchData();
      } else {
        toast({ title: "Error", description: result.message || "Delete failed.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Error", description: "Could not delete row.", variant: "destructive" });
    }
  };

  const renderField = (col) => {
    const value = formData[col.key] || '';
    if (col.type === 'textarea') {
      return (
        <Textarea
          value={value}
          onChange={(e) => setFormData({ ...formData, [col.key]: e.target.value })}
          placeholder={col.hint || col.label}
          className="bg-white/5 border-2 border-black/20 dark:border-white/10"
          rows={3}
        />
      );
    }
    if (col.type === 'select' && col.options) {
      return (
        <Select value={value} onValueChange={(v) => setFormData({ ...formData, [col.key]: v })}>
          <SelectTrigger className="bg-white/5 border-2 border-black/20 dark:border-white/10">
            <SelectValue placeholder={`Select ${col.label}`} />
          </SelectTrigger>
          <SelectContent>
            {col.options.map(opt => (
              <SelectItem key={opt} value={opt}>{opt}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }
    return (
      <Input
        value={value}
        onChange={(e) => setFormData({ ...formData, [col.key]: e.target.value })}
        placeholder={col.hint || col.label}
        className="bg-white/5 border-2 border-black/20 dark:border-white/10"
      />
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground">{title}</h2>
          {description && <p className="text-muted-foreground mt-1">{description}</p>}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={fetchData}>
            <RefreshCw className="h-4 w-4 mr-1" /> Refresh
          </Button>
          <Button size="sm" onClick={openAdd} className="bg-primary hover:bg-blue-600 text-primary-foreground">
            <Plus className="h-4 w-4 mr-1" /> Add Row
          </Button>
        </div>
      </div>

      {rows.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No data found in {sheetName}.</p>
          <Button size="sm" onClick={openAdd} className="mt-4 bg-primary hover:bg-blue-600 text-primary-foreground">
            <Plus className="h-4 w-4 mr-1" /> Add First Entry
          </Button>
        </div>
      ) : (
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  {columns.slice(0, 5).map(col => (
                    <TableHead key={col.key}>{col.label}</TableHead>
                  ))}
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-muted-foreground">{i + 1}</TableCell>
                    {columns.slice(0, 5).map(col => (
                      <TableCell key={col.key} className="max-w-[200px] truncate">
                        {row[col.key] || '—'}
                      </TableCell>
                    ))}
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="sm" onClick={() => openEdit(row, i)}>
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => setDeleteConfirm(i)} className="text-destructive hover:text-destructive">
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editIndex !== null ? 'Edit' : 'Add'} {title} Entry</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {columns.map(col => (
              <div key={col.key} className="space-y-1.5">
                <Label>{col.label}{col.hint ? <span className="text-xs text-muted-foreground ml-1">({col.hint})</span> : null}</Label>
                {renderField(col)}
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving} className="bg-primary hover:bg-blue-600 text-primary-foreground">
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : null}
              {editIndex !== null ? 'Update' : 'Add'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm Dialog */}
      <Dialog open={deleteConfirm !== null} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">Are you sure you want to delete this row? This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
            <Button variant="destructive" onClick={() => handleDelete(deleteConfirm)}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default SheetEditor;
