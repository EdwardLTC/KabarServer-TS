import { MediaController } from '@/controllers/media';
import { Routes } from '@/interfaces/routes.interface';
import { ImageMiddleware } from '@/middlewares/image.middeware';
import { Router } from 'express';

export class MediaRoute implements Routes {
  public path = '/media';
  public router = Router();
  public media = new MediaController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    //http://localhost:3000/api/media/upload
    this.router.post(`${this.path}/upload`, ImageMiddleware, this.media.upload);
  }
}
