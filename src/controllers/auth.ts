import { BaseRequest } from '@/interfaces/baseRequest';
import { AuthService } from '@/services/auth';
import { NextFunction, Response } from 'express';
import { Container } from 'typedi';

export class AuthController {
  public auth = Container.get(AuthService);

  public login = async (req: BaseRequest, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const loginData = await this.auth.login(email, password);
      res.status(loginData.statusCode).json(loginData);
    } catch (error) {
      next(error);
    }
  };

  public logout = async (req: BaseRequest, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      console.log(token);
      const logoutData = await this.auth.logout(token);
      res.status(logoutData.statusCode).json(logoutData);
    } catch (error) {
      next(error);
    }
  };

  public checkToken = async (req: BaseRequest, res: Response, next: NextFunction) => {
    try {
      const token = this.extractToken(req);
      const checkTokenData = await this.auth.checkToken(token);
      res.status(200).json(checkTokenData);
    } catch (error) {
      next(error);
    }
  };

  public extractToken = (req: BaseRequest) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    } else if (req.cookies && req.cookies.token) {
      return req.cookies.token;
    }
    return null;
  };
}
