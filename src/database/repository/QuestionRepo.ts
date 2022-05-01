import Question, { QuestionModel } from '../model/Question';
import type { Types } from 'mongoose';
import type Subject from '../model/Subject';

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
  public static addQuestions(questions: Question[]): Promise<Question[]> {
    return QuestionModel.insertMany(questions);
  }

  /* function to retrieve questions for given subject for a input page number */
  public static getQuestionsBySubjectID(subject: Subject, page: number, limit: number): Promise<Question[]> {
    // @ts-ignore
    return QuestionModel.find({ "subject": subject })
      .skip(limit * (page - 1))
      .limit(limit)
      .select('+statement +options +_id')
      .lean<Question>()
      .exec();
  }
  
}
