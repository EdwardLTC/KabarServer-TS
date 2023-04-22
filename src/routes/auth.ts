import { AuthController } from '@/controllers/auth';
import { Routes } from '@/interfaces/routes.interface';
import { Router } from 'express';

export class AuthRoute implements Routes {
  public path = '/auth';
  public router = Router();
  public auth = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    //http://localhost:3000/api/auth/login
    this.router.post(`${this.path}/login`, this.auth.login);
    //http://localhost:3000/api/auth/logout
    this.router.get(`${this.path}/logout`, this.auth.logout);
  }
}
