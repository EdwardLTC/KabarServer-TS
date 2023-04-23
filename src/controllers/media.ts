import { MediaService } from '@/services/media';
import { NextFunction, Request, Response } from 'express';
import Container from 'typedi';

export class MediaController {
  public media = Container.get(MediaService);
  public upload = async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.file.path = req.protocol + '://' + req.get('host') + '/uploads/' + req.file.filename;
      const media = await this.media.insertMedia(req.file);
      res.status(media.statusCode).json(media);
    } catch (error) {
      next(error);
    }
  };
}