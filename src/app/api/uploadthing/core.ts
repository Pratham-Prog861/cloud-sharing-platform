// FILE: src/app/api/uploadthing/core.ts
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const f = createUploadthing();

export const ourFileRouter = {
  fileUploader: f({
    image: { maxFileSize: "16MB", maxFileCount: 10 },
    video: { maxFileSize: "16MB", maxFileCount: 5 },
    audio: { maxFileSize: "16MB", maxFileCount: 10 },
    pdf: { maxFileSize: "16MB", maxFileCount: 10 },
    text: { maxFileSize: "16MB", maxFileCount: 10 },
    blob: { maxFileSize: "16MB", maxFileCount: 10 },
  })
    .middleware(async () => {
      const session = await getServerSession(authOptions);
      const userId = session?.user?.id || "anonymous";
      const userEmail = session?.user?.email || "";
      
      return { userId, userEmail };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);
      
      return { 
        url: file.url,
        name: file.name,
        size: file.size,
        type: file.type,
        userId: metadata.userId,
        userEmail: metadata.userEmail,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
