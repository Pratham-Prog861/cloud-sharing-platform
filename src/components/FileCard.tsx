// FILE: src/components/FileCard.tsx
"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Download, 
  Share2, 
  Edit2, 
  Check, 
  X, 
  Eye, 
  EyeOff,
  Copy 
} from "lucide-react"
import { formatBytes, isImageFile } from "@/lib/helpers"
import toast from "react-hot-toast"
import Image from "next/image"

interface FileCardProps {
  file: {
    _id: string
    name: string
    type: string
    url: string
    size: number
    isPublic: boolean
    slug: string
    downloads: number
    visitors: number
    createdAt: string
  }
  onUpdate?: () => void
}

export function FileCard({ file, onUpdate }: FileCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [newName, setNewName] = useState(file.name)
  const [loading, setLoading] = useState(false)

  const publicUrl = `${process.env.NEXT_PUBLIC_APP_URL || window.location.origin}/file/${file.slug}`

  const handleRename = async () => {
    if (!newName.trim() || newName === file.name) {
      setIsEditing(false)
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`/api/files/${file._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      })

      if (!response.ok) throw new Error("Failed to rename")

      toast.success("File renamed successfully!")
      setIsEditing(false)
      onUpdate?.()
    } catch (error) {
      toast.error("Failed to rename file")
    } finally {
      setLoading(false)
    }
  }

  const handleTogglePublic = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/files/${file._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublic: !file.isPublic }),
      })

      if (!response.ok) throw new Error("Failed to update")

      toast.success(file.isPublic ? "File is now private" : "File is now public! Share link is ready.")
      onUpdate?.()
    } catch (error) {
      toast.error("Failed to update file")
    } finally {
      setLoading(false)
    }
  }

  const copyLink = () => {
    navigator.clipboard.writeText(publicUrl)
    toast.success("Share link copied to clipboard!")
  }

  const shareFile = async () => {
    // Always copy to clipboard for reliability
    copyLink()
  }

  const handleDownload = async () => {
    try {
      // Download through our API to force download instead of opening
      window.location.href = `/api/files/${file._id}/download`
    } catch (error) {
      toast.error("Failed to download file")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden">
        {isImageFile(file.type) && (
          <div className="relative w-full h-48 bg-muted">
            <Image
              src={file.url}
              alt={file.name}
              fill
              className="object-cover"
            />
          </div>
        )}
        
        <CardContent className="p-4">
          {isEditing ? (
            <div className="flex gap-2 mb-3">
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                disabled={loading}
                className="flex-1"
              />
              <Button
                size="icon"
                onClick={handleRename}
                disabled={loading}
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                onClick={() => {
                  setIsEditing(false)
                  setNewName(file.name)
                }}
                disabled={loading}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">{file.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {formatBytes(file.size)}
                </p>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsEditing(true)}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
            </div>
          )}

          <div className="flex gap-2 text-xs text-muted-foreground mb-4">
            <span className="flex items-center gap-1">
              <Download className="h-3 w-3" />
              {file.downloads}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {file.visitors}
            </span>
            <span className={`ml-auto px-2 py-0.5 rounded ${
              file.isPublic ? "bg-green-500/10 text-green-600" : "bg-gray-500/10 text-gray-600"
            }`}>
              {file.isPublic ? "Public" : "Private"}
            </span>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="flex-1"
            >
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleTogglePublic}
              disabled={loading}
              title={file.isPublic ? "Make private" : "Make public"}
            >
              {file.isPublic ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={shareFile}
              disabled={!file.isPublic}
              title={file.isPublic ? "Copy share link" : "Make public to share"}
            >
              {file.isPublic ? <Share2 className="h-4 w-4" /> : <Copy className="h-4 w-4 opacity-50" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
