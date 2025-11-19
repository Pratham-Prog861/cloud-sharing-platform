/* eslint-disable @typescript-eslint/no-explicit-any */
// FILE: src/app/analytics/page.tsx
"use client"

import { useState, useEffect } from "react"
import { motion } from "motion/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { Download, Eye, FileIcon, Loader2, ArrowLeft } from "lucide-react"
import { formatBytes } from "@/lib/helpers"
import { format } from "date-fns"

export default function AnalyticsPage() {
  const [files, setFiles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [sortField, setSortField] = useState<string>("createdAt")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  useEffect(() => {
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

    fetchFiles()
  }, [])

  const totalDownloads = files.reduce((sum, file) => sum + file.downloads, 0)
  const totalVisitors = files.reduce((sum, file) => sum + file.visitors, 0)
  const publicFiles = files.filter(f => f.isPublic).length

  // Color palette for the chart bars
  const chartColors = [
    "#6366f1", // Indigo
    "#8b5cf6", // Violet
    "#ec4899", // Pink
    "#f59e0b", // Amber
    "#10b981", // Emerald
  ]

  const topFiles = [...files]
    .sort((a, b) => b.downloads - a.downloads)
    .slice(0, 5)
    .map((f, index) => ({
      name: f.name.length > 20 ? f.name.substring(0, 20) + "..." : f.name,
      downloads: f.downloads,
      color: chartColors[index % chartColors.length],
    }))

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortOrder("desc")
    }
  }

  const sortedFiles = [...files].sort((a, b) => {
    let aVal = a[sortField]
    let bVal = b[sortField]

    if (sortField === "createdAt") {
      aVal = new Date(aVal).getTime()
      bVal = new Date(bVal).getTime()
    }

    if (sortOrder === "asc") {
      return aVal > bVal ? 1 : -1
    } else {
      return aVal < bVal ? 1 : -1
    }
  })

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Analytics</h1>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Downloads
                    </CardTitle>
                    <Download className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalDownloads}</div>
                    <p className="text-xs text-muted-foreground">
                      Across {files.length} files
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Visitors
                    </CardTitle>
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalVisitors}</div>
                    <p className="text-xs text-muted-foreground">
                      Unique page views
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Public Files
                    </CardTitle>
                    <FileIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{publicFiles}</div>
                    <p className="text-xs text-muted-foreground">
                      Out of {files.length} total
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {topFiles.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-8"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Most Downloaded Files</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={350}>
                      <BarChart 
                        data={topFiles}
                        margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                      >
                        <defs>
                          {topFiles.map((file, index) => (
                            <linearGradient key={`gradient-${index}`} id={`colorGradient${index}`} x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor={file.color} stopOpacity={0.8}/>
                              <stop offset="100%" stopColor={file.color} stopOpacity={0.3}/>
                            </linearGradient>
                          ))}
                        </defs>
                        <CartesianGrid 
                          strokeDasharray="3 3" 
                          stroke="#e5e7eb"
                          opacity={0.5}
                        />
                        <XAxis 
                          dataKey="name" 
                          stroke="#6b7280"
                          tick={{ fill: '#6b7280', fontSize: 12 }}
                          angle={-45}
                          textAnchor="end"
                          height={80}
                        />
                        <YAxis 
                          stroke="#6b7280"
                          tick={{ fill: '#6b7280', fontSize: 12 }}
                          allowDecimals={false}
                        />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: '#ffffff',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                          }}
                          cursor={{ fill: '#f3f4f6', opacity: 0.5 }}
                        />
                        <Bar 
                          dataKey="downloads" 
                          radius={[8, 8, 0, 0]}
                          maxBarSize={60}
                        >
                          {topFiles.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={`url(#colorGradient${index})`} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>All Files</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead
                          className="cursor-pointer hover:text-foreground"
                          onClick={() => handleSort("name")}
                        >
                          File Name {sortField === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                        </TableHead>
                        <TableHead
                          className="cursor-pointer hover:text-foreground"
                          onClick={() => handleSort("downloads")}
                        >
                          Downloads {sortField === "downloads" && (sortOrder === "asc" ? "↑" : "↓")}
                        </TableHead>
                        <TableHead
                          className="cursor-pointer hover:text-foreground"
                          onClick={() => handleSort("visitors")}
                        >
                          Visitors {sortField === "visitors" && (sortOrder === "asc" ? "↑" : "↓")}
                        </TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead
                          className="cursor-pointer hover:text-foreground"
                          onClick={() => handleSort("createdAt")}
                        >
                          Uploaded {sortField === "createdAt" && (sortOrder === "asc" ? "↑" : "↓")}
                        </TableHead>
                        <TableHead>Size</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedFiles.map((file) => (
                        <TableRow key={file._id}>
                          <TableCell className="font-medium">{file.name}</TableCell>
                          <TableCell>{file.downloads}</TableCell>
                          <TableCell>{file.visitors}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded text-xs ${
                              file.isPublic
                                ? "bg-green-500/10 text-green-600"
                                : "bg-gray-500/10 text-gray-600"
                            }`}>
                              {file.isPublic ? "Public" : "Private"}
                            </span>
                          </TableCell>
                          <TableCell>
                            {format(new Date(file.createdAt), "MMM dd, yyyy")}
                          </TableCell>
                          <TableCell>{formatBytes(file.size)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </main>
    </div>
  )
}
