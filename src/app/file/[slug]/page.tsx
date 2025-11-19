// FILE: src/app/file/[slug]/page.tsx
"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { motion } from "motion/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Eye, Calendar, FileIcon, Loader2 } from "lucide-react"
import { formatBytes, isImageFile } from "@/lib/helpers"
import { format } from "date-fns"
import Image from "next/image"
import toast from "react-hot-toast"

export default function PublicFilePage() {
  const params = useParams()
  const slug = params.slug as string
  const [file, setFile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await fetch(`/api/files/slug/${slug}`)
        if (!response.ok) throw new Error("File not found")
        
        const data = await response.json()
        setFile(data.file)
      } catch (error) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchFile()
    }
  }, [slug])

  const handleDownload = async () => {
    if (!file) return

    try {
      // Download through our API to force download instead of opening
      window.location.href = `/api/files/${file._id}/download`
      
      toast.success("Download started!")
      
      setFile((prev: any) => ({
        ...prev,
        downloads: prev.downloads + 1,
      }))
    } catch (error) {
      toast.error("Failed to download file")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error || !file) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="pt-6 text-center">
            <FileIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">File Not Found</h2>
            <p className="text-muted-foreground mb-4">
              This file doesn't exist or is not publicly accessible.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">Cloud Share</h1>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="overflow-hidden">
            {isImageFile(file.type) && (
              <div className="relative w-full h-96 bg-muted">
                <Image
                  src={file.url}
                  alt={file.name}
                  fill
                  className="object-contain"
                />
              </div>
            )}

            <CardHeader>
              <CardTitle className="text-3xl">{file.name}</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <FileIcon className="h-4 w-4" />
                  <div>
                    <p className="text-xs">Size</p>
                    <p className="font-medium text-foreground">
                      {formatBytes(file.size)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Download className="h-4 w-4" />
                  <div>
                    <p className="text-xs">Downloads</p>
                    <p className="font-medium text-foreground">{file.downloads}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Eye className="h-4 w-4" />
                  <div>
                    <p className="text-xs">Views</p>
                    <p className="font-medium text-foreground">{file.visitors}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <div>
                    <p className="text-xs">Uploaded</p>
                    <p className="font-medium text-foreground">
                      {format(new Date(file.createdAt), "MMM dd")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={handleDownload} className="flex-1" size="lg">
                  <Download className="h-5 w-5 mr-2" />
                  Download File
                </Button>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>File Type:</strong> {file.type || "Unknown"}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <footer className="border-t mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          Powered by Cloud Share - Secure file sharing platform
        </div>
      </footer>
    </div>
  )
}
