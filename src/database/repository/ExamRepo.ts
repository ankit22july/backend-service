import Exam, { ExamModel } from '../model/Exam';
import type { Types } from 'mongoose';
import type User from '../model/User';

export default class ExamRepo {
  private static AUTHOR_DETAIL = 'name profilePicUrl';
  private static EXAM_INFO_ADDITIONAL = '+isSubmitted +isDraft +isPublished +createdBy +updatedBy';
  private static EXAM_ALL_DATA =
    '+subject +questions +isSubmitted +isDraft +isPublished +status +createdBy +updatedBy';

  public static async create(exam: Exam): Promise<Exam> {
    const now = new Date();
    exam.createdAt = now;
    exam.updatedAt = now;
    const createdExam = await ExamModel.create(exam);
    console.log("Exam object: ", createdExam.toObject()); 
    // @ts-ignore
    return createdExam.toObject();
  }

  public static update(exam: Exam): Promise<any> {
    exam.updatedAt = new Date();
    return ExamModel.updateOne({ _id: exam._id }, { $set: { ...exam } })
      .lean<Exam>()
      .exec();
  }

  public static findInfoById(id: Types.ObjectId): Promise<Exam | null> {
    return ExamModel.findOne({ _id: id, status: true })
      .populate('author', this.AUTHOR_DETAIL)
      .lean<Exam>()
      .exec();
  }

  public static findInfoWithTextById(id: Types.ObjectId): Promise<Exam | null> {
    return ExamModel.findOne({ _id: id, status: true })
      .select('+text')
      .populate('author', this.AUTHOR_DETAIL)
      .lean<Exam>()
      .exec();
  }

  public static findInfoWithTextAndDraftTextById(id: Types.ObjectId): Promise<Exam | null> {
    return ExamModel.findOne({ _id: id, status: true })
      .select('+text +draftText +isSubmitted +isDraft +isPublished +status')
      .populate('author', this.AUTHOR_DETAIL)
      .lean<Exam>()
      .exec();
  }

  public static findExamAllDataById(id: Types.ObjectId): Promise<Exam | null> {
    return ExamModel.findOne({ _id: id, status: true })
      .select(this.EXAM_ALL_DATA)
      .populate('author', this.AUTHOR_DETAIL)
      .lean<Exam>()
      .exec();
  }

  public static findByUrl(examUrl: string): Promise<Exam | null> {
    return ExamModel.findOne({ examUrl: examUrl, status: true })
      .select('+text')
      .populate('author', this.AUTHOR_DETAIL)
      .lean<Exam>()
      .exec();
  }

  public static findUrlIfExists(examUrl: string): Promise<Exam | null> {
    return ExamModel.findOne({ examUrl: examUrl }).lean<Exam>().exec();
  }

  public static findByTagAndPaginated(
    tag: string,
    pageNumber: number,
    limit: number,
  ): Promise<Exam[]> {
    // @ts-ignore
    return ExamModel.find({ tags: tag, status: true, isPublished: true })
      .skip(limit * (pageNumber - 1))
      .limit(limit)
      .populate('author', this.AUTHOR_DETAIL)
      .sort({ updatedAt: -1 })
      .lean<Exam>()
      .exec();
  }

  public static findAllPublishedForAuthor(user: User): Promise<Exam[]> {
    // @ts-ignore
    return ExamModel.find({ author: user, status: true, isPublished: true })
      .populate('author', this.AUTHOR_DETAIL)
      .sort({ updatedAt: -1 })
      .lean<Exam>()
      .exec();
  }

  public static findAllDrafts(): Promise<Exam[]> {
    return this.findDetailedExams({ isDraft: true, status: true });
  }

  public static findAllSubmissions(): Promise<Exam[]> {
    return this.findDetailedExams({ isSubmitted: true, status: true });
  }

  public static findAllPublished(): Promise<Exam[]> {
    return this.findDetailedExams({ isPublished: true, status: true });
  }

  public static findAllSubmissionsForAuthor(user: User): Promise<Exam[]> {
    return this.findDetailedExams({ author: user, status: true, isSubmitted: true });
  }

  public static findAllPublishedForWriter(user: User): Promise<Exam[]> {
    return this.findDetailedExams({ author: user, status: true, isPublished: true });
  }

  public static findAllDraftsForAuthor(user: User): Promise<Exam[]> {
    return this.findDetailedExams({ author: user, status: true, isDraft: true });
  }

  private static findDetailedExams(query: Record<string, unknown>): Promise<Exam[]> {
    // @ts-ignore
    return ExamModel.find(query)
      .select(this.EXAM_INFO_ADDITIONAL)
      .populate('author', this.AUTHOR_DETAIL)
      .populate('createdBy', this.AUTHOR_DETAIL)
      .populate('updatedBy', this.AUTHOR_DETAIL)
      .sort({ updatedAt: -1 })
      .lean<Exam>()
      .exec();
  }

  public static findLatestExams(pageNumber: number, limit: number): Promise<Exam[]> {
    // @ts-ignore
    return ExamModel.find({ status: true, isPublished: true })
      .skip(limit * (pageNumber - 1))
      .limit(limit)
      .populate('author', this.AUTHOR_DETAIL)
      .sort({ publishedAt: -1 })
      .lean<Exam>()
      .exec();
  }

  public static searchSimilarExams(exam: Exam, limit: number): Promise<Exam[]> {
    // @ts-ignore
    return ExamModel.find(
      {
        $text: { $search: exam.title, $caseSensitive: false },
        status: true,
        isPublished: true,
        _id: { $ne: exam._id },
      },
      {
        similarity: { $meta: 'textScore' },
      },
    )
      .populate('author', this.AUTHOR_DETAIL)
      .sort({ updatedAt: -1 })
      .limit(limit)
      .sort({ similarity: { $meta: 'textScore' } })
      .lean<Exam>()
      .exec();
  }

  public static search(query: string, limit: number): Promise<Exam[]> {
    // @ts-ignore
    return ExamModel.find(
      {
        $text: { $search: query, $caseSensitive: false },
        status: true,
        isPublished: true,
      },
      {
        similarity: { $meta: 'textScore' },
      },
    )
      .select('-status -description')
      .limit(limit)
      .sort({ similarity: { $meta: 'textScore' } })
      .lean<Exam>()
      .exec();
  }
}
