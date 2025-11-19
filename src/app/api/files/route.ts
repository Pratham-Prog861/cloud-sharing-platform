// FILE: src/app/api/files/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { File } from "@/lib/file-model";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    const searchParams = request.nextUrl.searchParams;
    const ownerId = searchParams.get("ownerId") || session?.user?.id || "anonymous";

    const files = await File.find({ 
      $or: [
        { ownerId },
        { userId: session?.user?.id }
      ]
    }).sort({ createdAt: -1 });

    return NextResponse.json({ files });
  } catch (error) {
    console.error("Error fetching files:", error);
    return NextResponse.json(
      { error: "Failed to fetch files" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    const body = await request.json();
    const { files } = body;

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "No files provided" },
        { status: 400 }
      );
    }

    const uploadedFiles = [];

    for (const fileData of files) {
      const newFile = await File.create({
        ...fileData,
        ownerId: session?.user?.id || "anonymous",
        userId: session?.user?.id,
        userEmail: session?.user?.email,
      });
      uploadedFiles.push(newFile);
    }

    return NextResponse.json({ 
      files: uploadedFiles,
      message: "Files uploaded successfully" 
    });
  } catch (error) {
    console.error("Error uploading files:", error);
    return NextResponse.json(
      { error: "Failed to upload files" },
      { status: 500 }
    );
  }
}
