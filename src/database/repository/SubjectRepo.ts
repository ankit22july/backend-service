import Subject, { SubjectModel } from '../model/Subject';

export default class SubjectRepo {
  public static findByCode(name: string): Promise<Subject | null> {
    return SubjectModel.findOne({ name: name, status: true }).lean<Subject>().exec();
  }
}
