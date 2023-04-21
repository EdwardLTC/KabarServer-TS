import { Service } from 'typedi';
import { HttpException, HttpResponse } from '@/httpModals';
import { User } from '@/interfaces/users';
import { UserModel } from '@/models/users';

@Service()
export class UserService {
  private userModel = new UserModel().getInstance();

  public async findAllUser(): Promise<HttpResponse> {
    try {
      const users: User[] = await this.userModel.find();
      return new HttpResponse(users);
    } catch (error) {
      throw new HttpException(error);
    }
  }

  public async findUserById(userId: string): Promise<HttpResponse> {
    try {
      const findUser: User = await this.userModel.findOne({ _id: userId });
      return new HttpResponse(findUser);
    } catch (error) {
      throw new HttpException(error);
    }
  }

  public async createUser(userData: User): Promise<HttpResponse> {
    try {
      const createUserData: User = await this.userModel.create(userData);
      return new HttpResponse(createUserData);
    } catch (error) {
      throw new HttpException(error);
    }
  }

  public async updateUser(userId: string, userData: User): Promise<HttpResponse> {
    try {
      const updateUserById: User = await this.userModel.findOneAndUpdate({ _id: userId }, { userData });
      return new HttpResponse(updateUserById);
    } catch (error) {
      throw new HttpException(error);
    }
  }
}
