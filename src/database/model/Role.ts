import { Document, Schema, model } from 'mongoose';

export const DOCUMENT_NAME = 'Role';
export const COLLECTION_NAME = 'roles';

export const enum RoleCode {
  STUDENT = 'STUDENT',
  AUTHOR = 'AUTHOR',
  MAINTAINER = 'MAINTAINER',
  ADMIN = 'ADMIN',
}

export default interface Role extends Document {
  code: string;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema(
  {
    code: {
      type: Schema.Types.String,
      required: true,
      enum: [RoleCode.STUDENT, RoleCode.AUTHOR, RoleCode.MAINTAINER, RoleCode.ADMIN],
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

export const RoleModel = model<Role>(DOCUMENT_NAME, schema, COLLECTION_NAME);
