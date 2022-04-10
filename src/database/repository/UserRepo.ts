import { InternalError } from '../../core/ApiError';
import KeystoreRepo from './KeystoreRepo';
import Role, { RoleModel } from '../model/Role';
import User, { UserModel } from '../model/User';
import type { Types } from 'mongoose';
import type Keystore from '../model/Keystore';

export default class UserRepo {
  private static remove(id: Types.ObjectId): Promise<User | null> {
    return UserModel.findByIdAndRemove(id).lean<User>().exec();
  }

  // contains critical information of the user
  public static findById(id: Types.ObjectId): Promise<User | null> {
    return UserModel.findOne({ _id: id, status: true })
      .select('+email +password +roles')
      .populate({
        path: 'roles',
        match: { status: true },
      })
      .lean<User>()
      .exec();
  }

  public static findByEmail(email: string): Promise<User | null> {
    return UserModel.findOne({ email: email, status: true })
      .select('+email +password +roles')
      .populate({
        path: 'roles',
        match: { status: true },
        select: { code: 1 },
      })
      .lean<User>()
      .exec();
  }

  public static findProfileById(id: Types.ObjectId): Promise<User | null> {
    return UserModel.findOne({ _id: id, status: true })
      .select('+roles')
      .populate({
        path: 'roles',
        match: { status: true },
        select: { code: 1 },
      })
      .lean<User>()
      .exec();
  }

  public static findPublicProfileById(id: Types.ObjectId): Promise<User | null> {
    return UserModel.findOne({ _id: id, status: true }).lean<User>().exec();
  }

  public static async create(
    user: User,
    accessTokenKey: string,
    refreshTokenKey: string,
    roleCode: string,
  ): Promise<{ user: User; keystore: Keystore }> {
    const now = new Date();

    const role = await RoleModel.findOne({ code: roleCode })
      .select('+email +password')
      .lean<Role>()
      .exec();
    if (!role) {
      throw new InternalError('Role must be defined');
    }

    user.roles = [role._id];
    user.createdAt = user.updatedAt = now;
    const createdUser = await UserModel.create(user);
    const keystore = await KeystoreRepo.create(createdUser._id, accessTokenKey, refreshTokenKey);
    // @ts-ignore
    return { user: createdUser.toObject(), keystore: keystore };
  }

  public static retrieveUsersByPage(pageNumber: number, limit: number): Promise<User[]> {
    // @ts-ignore
    return UserModel.find({})
      .skip(limit * (pageNumber - 1))
      .limit(limit)
      .sort({ updatedAt: -1 })
      .lean<User>()
      .exec();
  }

  public static async update(
    user: User,
    accessTokenKey: string,
    refreshTokenKey: string,
  ): Promise<{ user: User; keystore: Keystore }> {
    user.updatedAt = new Date();
    await UserModel.updateOne({ _id: user._id }, { $set: { ...user } })
      .lean()
      .exec();
    const keystore = await KeystoreRepo.create(user._id, accessTokenKey, refreshTokenKey);
    return { user: user, keystore: keystore };
  }

  public static updateInfo(user: User): Promise<any> {
    user.updatedAt = new Date();
    return UserModel.updateOne({ _id: user._id }, { $set: { ...user } })
      .lean()
      .exec();
  }

  /* Add method to delete a given user from mongo*/
  public static deleteUser(user: User): Promise<User | null> {
    return UserModel.findByIdAndRemove(user._id ).lean<User>().exec();
  }
}
