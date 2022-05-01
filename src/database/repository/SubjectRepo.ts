import Subject, { SubjectModel } from '../model/Subject';
import type { Types } from 'mongoose';

export default class SubjectRepo {
  public static findByName(name: string): Promise<Subject | null> {
    return SubjectModel.findOne({ name: name, status: true }).lean<Subject>().exec();
  }

  /* Add method to find subject by object id */
  public static findById(id: Types.ObjectId): Promise<Subject | null> {
    return SubjectModel.findOne({ _id: id, status: true }).lean<Subject>().exec();
  }

  /* Add method to find all subjects */
  public static findAll(): Promise<Subject[]> {
    // @ts-ignore
    return SubjectModel.find({ status: true }).lean<Subject>().exec();
  }

  /* Add method to create new subject in subjectrepo mongo collection */
  public static addSubject(subject: Subject): Promise<Subject> {
    const now = new Date();
    subject.createdAt = subject.updatedAt = now;
    subject.status = true;
    return SubjectModel.create(subject);
  }
}
