import { Document, Schema, model } from 'mongoose';

export const DOCUMENT_NAME = 'Subject';
export const COLLECTION_NAME = 'subjects';

export default interface Subject extends Document {
  name: string;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    status: {
      type: Schema.Types.Boolean,
      default: true,
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

export const SubjectModel = model<Subject>(DOCUMENT_NAME, schema, COLLECTION_NAME);
