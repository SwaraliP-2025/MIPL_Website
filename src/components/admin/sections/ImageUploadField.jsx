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
        let url = result.url;
        // Convert Google Drive share link to direct image link if needed
        const driveMatch = url && url.match(/https:\/\/drive\.google\.com\/file\/d\/([\w-]+)\/view.*/);
        if (driveMatch) {
          const fileId = driveMatch[1];
          url = `https://drive.google.com/uc?export=view&id=${fileId}`;
        }
        setPreview(url);
        onChange(url);
        toast({ title: "Uploaded!", description: "Image saved to Google Drive." });
      } else {
        toast({ title: "Upload Failed", description: result.message || "Try again.", variant: "destructive" });
        setPreview(value); // revert
      }
    } catch {
      toast({ title: "Upload Failed", description: "Network error.", variant: "destructive" });
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
            <span className="text-sm">Uploading to Drive...</span>
          </div>
        ) : preview ? (
          <img src={preview} alt="preview" className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Upload className="h-7 w-7" />
            <span className="text-sm font-medium">Click to upload image</span>
            <span className="text-xs">JPG, PNG, WebP — stored on Google Drive</span>
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
