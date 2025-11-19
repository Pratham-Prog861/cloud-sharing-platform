// FILE: src/app/api/files/slug/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { File } from "@/lib/file-model";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();
    const { slug } = await params;
    
    const file = await File.findOneAndUpdate(
      { slug, isPublic: true },
      { $inc: { visitors: 1 } },
      { new: true }
    );

    if (!file) {
      return NextResponse.json(
        { error: "File not found or not public" },
        { status: 404 }
      );
    }

    return NextResponse.json({ file });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch file" },
      { status: 500 }
    );
  }
}
