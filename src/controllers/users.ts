import { NextFunction, Response } from 'express';
import { Container } from 'typedi';
import { User } from '@/interfaces/users';
import { UserService } from '@/services/users';
import { HttpResponse } from '@/httpModals/httpResponse';
import { BaseRequest } from '@/interfaces/baseRequest';
import { hash } from 'bcrypt';

export class UserController {
  public user = Container.get(UserService);

  public getUsers = async (req: BaseRequest, res: Response, next: NextFunction) => {
    try {
      const findAllUsersData: HttpResponse = await this.user.findAllUser();
      res.status(findAllUsersData.statusCode).json(findAllUsersData);
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: BaseRequest, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.body;
      const createUserData: HttpResponse = await this.user.createUser(userData);
      res.status(createUserData.statusCode).json(createUserData);
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: BaseRequest, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const userData: User = req.body;
      const updateUserData: HttpResponse = await this.user.updateUser(userId, userData);
      res.status(updateUserData.statusCode).json(updateUserData);
    } catch (error) {
      next(error);
    }
  };

  public changePassword = async (req: BaseRequest, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      const password: string = req.body.password;
      hash(password, 10, (err, hash) => {
        if (err) return next(err);
        userData.password = hash;
      });
      const updateUserData: HttpResponse = await this.user.updateUser(userData._id.toString(), userData);
      res.status(updateUserData.statusCode).json(updateUserData);
    } catch (error) {
      next(error);
    }
  };
}
