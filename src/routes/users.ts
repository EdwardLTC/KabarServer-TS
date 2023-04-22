import { Router } from 'express';
import { UserController } from '@/controllers/users';
import { Routes } from '@interfaces/routes.interface';

export class UserRoute implements Routes {
  public path = '/users';
  public router = Router();
  public user = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.user.getUsers);
    this.router.post(`${this.path}`, this.user.createUser);
    this.router.put(`${this.path}/:id`, this.user.updateUser);
    this.router.put(`${this.path}/change-password`, this.user.changePassword);
  }
}
