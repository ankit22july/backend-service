import { Document, Schema, model } from 'mongoose';
import type Question from './Question';
import type Subject from './Subject';
import type User from './User';

export const DOCUMENT_NAME = 'Exam';
export const COLLECTION_NAME = 'exams';

export default interface Exam extends Document {
  title: string;
  description: string;
  subject?: Subject;
  questions?: Question[];
  tags: string[];
  author: User;
  imgUrl?: string;
  maxScore: number;
  isSubmitted: boolean;
  isDraft: boolean;
  isPublished: boolean;
  status?: boolean;
  publishedAt?: Date;
  createdBy?: User;
  updatedBy?: User;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema(
  {
    title: {
      type: Schema.Types.String,
      required: true,
      maxlength: 100,
      trim: true,
    },
    description: {
      type: Schema.Types.String,
      required: true,
      maxlength: 500,
      trim: true,
    },
    subject: {
      type: Schema.Types.ObjectId,
      ref: 'Subject',
      required: true,
    },
    questions: {
      tyep: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
      required: true,
    },
    tags: [
      {
        type: Schema.Types.String,
        trim: true,
        uppercase: true,
      },
    ],
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    imgUrl: {
      type: Schema.Types.String,
      required: false,
      maxlength: 500,
      trim: true,
    },
    maxScore: {
      type: Schema.Types.Number,
      default: 0,
      min: 0,
    },
    isSubmitted: {
      type: Schema.Types.Boolean,
      default: false,
      select: false,
      index: true,
    },
    isDraft: {
      type: Schema.Types.Boolean,
      default: true,
      select: false,
      index: true,
    },
    isPublished: {
      type: Schema.Types.Boolean,
      default: false,
      select: false,
      index: true,
    },
    publishedAt: {
      type: Schema.Types.Date,
      required: false,
      index: true,
    },
    status: {
      type: Schema.Types.Boolean,
      default: true,
      select: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      select: false,
      index: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      select: false,
    },
    createdAt: {
      type: Date,
      required: true,
      select: false,
    },
    updatedAt: {
      type: Date,
      required: true,
      select: false,
    },
  },
  {
    versionKey: false,
  },
).index(
  { title: 'text', description: 'text' },
  { weights: { title: 3, description: 1 }, background: false },
);

export const ExamModel = model<Exam>(DOCUMENT_NAME, schema, COLLECTION_NAME);
