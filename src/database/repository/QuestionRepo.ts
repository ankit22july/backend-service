import Question, { QuestionModel } from '../model/Question';
import type { Types } from 'mongoose';

export default class SubjectRepo {
  public static findById(id: Types.ObjectId): Promise<Question | null> {
    return QuestionModel.findOne({ _id: id, status: true })
      .select('+statement +options +_id')
      .populate({
        path: 'subjects',
        match: { status: true },
      })
      .lean<Question>()
      .exec();
  }
}
