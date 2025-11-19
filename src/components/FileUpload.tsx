// FILE: src/components/FileUpload.tsx
"use client"

import { useState } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import toast from "react-hot-toast"
import { motion } from "motion/react"
import { useUploadThing } from "@/lib/uploadthing"
import { generateSlug } from "@/lib/helpers"

interface FileUploadProps {
  onUploadComplete?: () => void
}

export function FileUpload({ onUploadComplete }: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)

  const { startUpload } = useUploadThing("fileUploader", {
    onClientUploadComplete: async (res) => {
      console.log("Upload complete:", res);
      
      // Save file metadata to database
      if (res && res.length > 0) {
        try {
          const fileData = res.map((file) => ({
            name: file.name,
            type: file.type || "application/octet-stream",
            url: file.url,
            size: file.size,
            slug: generateSlug(),
            isPublic: true,
            userId: (file.serverData as any)?.userId,
            userEmail: (file.serverData as any)?.userEmail,
          }));

          const response = await fetch("/api/files", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ files: fileData }),
          });

          if (!response.ok) throw new Error("Failed to save file metadata");

          toast.success(`${files.length} file(s) uploaded successfully!`);
          setFiles([]);
          onUploadComplete?.();
        } catch (error) {
          toast.error("Files uploaded but failed to save metadata");
          console.error(error);
        }
      }
      setUploading(false);
    },
    onUploadError: (error) => {
      toast.error(`Upload failed: ${error.message}`);
      console.error("Upload error:", error);
      setUploading(false);
    },
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles)
    },
    multiple: true,
  })

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error("Please select files to upload")
      return
    }

    setUploading(true)
    
    try {
      await startUpload(files);
    } catch (error) {
      toast.error("Failed to upload files")
      console.error(error)
      setUploading(false)
    }
  }

  return (
    <Card className="p-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
          isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        {isDragActive ? (
          <p className="text-lg font-medium">Drop files here...</p>
        ) : (
          <>
            <p className="text-lg font-medium mb-2">Drag & drop files here</p>
            <p className="text-sm text-muted-foreground">or click to browse</p>
          </>
        )}
      </div>

      {files.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 space-y-2"
        >
          <h3 className="font-medium mb-3">Selected Files ({files.length})</h3>
          {files.map((file, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-3 bg-muted rounded-lg"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{file.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeFile(index)}
                disabled={uploading}
              >
                <X className="h-4 w-4" />
              </Button>
            </motion.div>
          ))}

          <Button
            onClick={handleUpload}
            disabled={uploading}
            className="w-full mt-4"
          >
            {uploading ? "Uploading..." : "Upload Files"}
          </Button>
        </motion.div>
      )}
    </Card>
  )
}
