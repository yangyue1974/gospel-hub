"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Upload, Check } from "lucide-react";

type ImageUploadProps = {
  bucket: string;
  table: string;
  recordId: string;
  field: string;
  currentUrl: string | null;
  slug: string;
};

export function ImageUpload({
  bucket,
  table,
  recordId,
  field,
  currentUrl,
  slug,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [done, setDone] = useState(false);
  const [preview, setPreview] = useState(currentUrl);
  const supabase = createClient();

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setDone(false);

    const ext = file.name.split(".").pop() || "jpg";
    const path = `${slug}-${Date.now()}.${ext}`;

    // Upload to storage
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(path, file, { upsert: true });

    if (uploadError) {
      alert("Upload failed: " + uploadError.message);
      setUploading(false);
      return;
    }

    // Get public URL
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    const publicUrl = data.publicUrl;

    // Update database record
    const { error: dbError } = await supabase
      .from(table)
      .update({ [field]: publicUrl })
      .eq("id", recordId);

    if (dbError) {
      alert("Save failed: " + dbError.message);
    } else {
      setPreview(publicUrl);
      setDone(true);
      setTimeout(() => setDone(false), 2000);
    }

    setUploading(false);
  }

  return (
    <div className="flex items-center gap-3">
      <div className="w-14 h-14 rounded bg-muted shrink-0 overflow-hidden border border-border">
        {preview ? (
          <img src={preview} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[10px] text-muted-foreground">
            No image
          </div>
        )}
      </div>
      <label className="cursor-pointer inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground hover:border-primary/50">
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
        />
        {uploading ? (
          "Uploading..."
        ) : done ? (
          <>
            <Check className="h-3 w-3 text-green-500" />
            Saved
          </>
        ) : (
          <>
            <Upload className="h-3 w-3" />
            Upload
          </>
        )}
      </label>
    </div>
  );
}
