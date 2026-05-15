import { useState } from "react";
import { Upload, Image, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { cmsUploadImage } from "../cmsApi";

/**
 * Reusable image upload field.
 * Props:
 *   label       - field label
 *   value       - current image URL string
 *   onChange    - called with new URL after upload
 *   hint        - optional hint text
 */
const ImageUploadField = ({ label = "Image", value = "", onChange, hint }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value);
  const { toast } = useToast();

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show local preview immediately
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);

    setUploading(true);
    try {
      const result = await cmsUploadImage(file);
      if (result.success) {
        const url = result.url;
        setPreview(url);
        onChange(url);
        toast({ title: "Uploaded!", description: "Image saved to Hostinger." });
      } else {
        toast({ title: "Upload Failed", description: result.message || "Try again.", variant: "destructive" });
        setPreview(value); // revert
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast({ title: "Upload Failed", description: "Network error or server issue.", variant: "destructive" });
      setPreview(value);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors overflow-hidden relative bg-muted/20">
        {uploading ? (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="text-sm">Uploading to Hostinger...</span>
          </div>
        ) : preview ? (
          <img src={preview} alt="preview" className="w-full h-full object-contain" />
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Upload className="h-7 w-7" />
            <span className="text-sm font-medium">Click to upload image</span>
            <span className="text-xs">JPG, PNG, WebP — stored on Hostinger</span>
          </div>
        )}
        <input type="file" accept="image/*" className="hidden" onChange={handleFile} disabled={uploading} />
      </label>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      {preview && !uploading && (
        <p className="text-xs text-muted-foreground truncate">URL: {preview}</p>
      )}
    </div>
  );
};

export default ImageUploadField;