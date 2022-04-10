import Question, { QuestionModel } from '../model/Question';
import type { Types } from 'mongoose';

export default class QuestionRepo {
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

  /* function to add input question array to mongo repo */
  public static addQuestions(question: Question[]): Promise<Question[]> {
    return QuestionModel.insertMany(question);
  }
  
}
