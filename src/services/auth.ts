import { HttpException, HttpResponse } from '@/httpModals';
import { User } from '@/interfaces/users';
import { AuthModel } from '@/models/auth';
import { Service } from 'typedi';
import { UserService } from './users';
import { UserModel } from '@/models/users';

Service();
export class AuthService {
  private authModel = new AuthModel();
  private userService = new UserService();
  private userModel = new UserModel();

  public async login(email: string, password: string): Promise<HttpResponse> {
    //find user
    const user: User = await this.userService.findUserByEmail(email, true);
    if (!user) {
      throw new HttpException({ message: 'Invalid Email', statusCode: 422 });
    } else {
      //process login
      try {
        //check password
        const isMatch = await this.userModel.comparePassword(password, user.password);
        if (!isMatch) {
          throw new HttpException({ message: 'Invalid Password', statusCode: 422 });
        } else {
          const token = this.authModel.generateToken(user);
          this.authModel.getInstance().create({ token, user: user._id });
          const userLogin = await this.authModel.getInstance().findOne({ token }).populate('user');
          return new HttpResponse({ userLogin });
        }
      } catch (error) {
        throw new HttpException({ statusCode: 500 });
      }
    }
  }

  public async logout(token: string): Promise<HttpResponse> {
    try {
      await this.authModel.getInstance().deleteOne({ token });
      return new HttpResponse({ message: 'Logout successfully' });
    } catch (error) {
      throw new HttpException({ statusCode: 500 });
    }
  }

  public async checkToken(token: string): Promise<any> {
    try {
      const isValidToken = await this.authModel.getInstance().countDocuments({ token });
      if (!isValidToken) {
        throw new HttpException({ message: 'Invalid Token', statusCode: 401 });
      }
      const decoded = this.authModel.decodeToken(token);
      if (!decoded) {
        throw new HttpException({ message: 'Invalid Token', statusCode: 401 });
      } else {
        return decoded;
      }
    } catch (error) {
      throw new HttpException({ statusCode: 500 });
    }
  }
}
