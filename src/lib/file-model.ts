import mongoose, { Schema, Document, models } from 'mongoose';

export interface IFile extends Document {
  _id: string;
  ownerId: string;
  userId?: string;
  userEmail?: string;
  name: string;
  type: string;
  url: string;
  size: number;
  isPublic: boolean;
  slug: string;
  downloads: number;
  visitors: number;
  createdAt: Date;
}

const FileSchema = new Schema<IFile>({
  ownerId: {
    type: String,
    required: true,
    default: 'anonymous',
  },
  userId: {
    type: String,
    required: false,
  },
  userEmail: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  isPublic: {
    type: Boolean,
    default: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  downloads: {
    type: Number,
    default: 0,
  },
  visitors: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

FileSchema.index({ slug: 1 });
FileSchema.index({ ownerId: 1 });

export const File = models.File || mongoose.model<IFile>('File', FileSchema);
