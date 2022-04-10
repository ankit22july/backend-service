import { Document, Schema, model } from 'mongoose';
import type Subject from './Subject';

export const DOCUMENT_NAME = 'Question';
export const COLLECTION_NAME = 'questions';

export default interface Question extends Document {
  statement: string;
  options: string[];
  answer?: number;
  subject?: Subject;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema(
  {
    statement: {
      type: Schema.Types.String,
      required: true,
    },
    type: {
      type: Schema.Types.String,
      required: true,
    },
    options: {
      type: [Schema.Types.String],
      default: [],
    },
    answer: {
      type: Schema.Types.Number,
      required: false,
    },
    subject: {
      type: {
        type: Schema.Types.ObjectId,
        ref: 'Subject',
      },
      required: false,
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
);

export const QuestionModel = model<Question>(DOCUMENT_NAME, schema, COLLECTION_NAME);
