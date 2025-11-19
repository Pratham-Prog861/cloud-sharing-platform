/* eslint-disable @typescript-eslint/no-explicit-any */
// FILE: src/app/dashboard/page.tsx
"use client"

import { useState, useEffect } from "react"
import { FileUpload } from "@/components/FileUpload"
import { FileCard } from "@/components/FileCard"
import { motion } from "motion/react"
import { Loader2, LogOut } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)
  const { data: session, status } = useSession()
  const router = useRouter()

  const fetchFiles = async () => {
    try {
      const response = await fetch("/api/files")
      const data = await response.json()
      setFiles(data.files || [])
    } catch (error) {
      console.error("Failed to fetch files:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
    } else if (status === "authenticated") {
      fetchFiles()
    }
  }, [status, router])

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Cloud Share</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              {session.user?.image && (
                <img 
                  src={session.user.image} 
                  alt={session.user.name || "User"} 
                  className="w-8 h-8 rounded-full"
                />
              )}
              <span className="text-sm text-muted-foreground">
                {session.user?.email}
              </span>
            </div>
            <Link href="/analytics">
              <Button variant="outline">Analytics</Button>
            </Link>
            <Button 
              variant="outline" 
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold mb-2">Upload Files</h2>
          <p className="text-muted-foreground mb-6">
            Share your files with the world. Files are public by default - click the eye icon to make them private.
          </p>
          <FileUpload onUploadComplete={fetchFiles} />
        </motion.div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Your Files</h2>
          
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : files.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 bg-muted/50 rounded-lg"
            >
              <p className="text-lg text-muted-foreground">
                No files uploaded yet. Start by uploading your first file!
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {files.map((file: any) => (
                <FileCard key={file._id} file={file} onUpdate={fetchFiles} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
