import { Media } from '@/interfaces/media';
import { Schema, model } from 'mongoose';

export class MediaModel {
  constructor() {
    const MediaSchema: Schema = new Schema<Media>(
      {
        originalname: {
          type: String,
          required: false,
        },
        encoding: {
          type: String,
          required: false,
        },
        mimetype: {
          type: String,
          required: false,
        },
        filename: {
          type: String,
          required: false,
        },
        path: {
          type: String,
          required: false,
        },
        size: {
          type: Number,
          required: false,
        },
      },
      { timestamps: true },
    );

    try {
      model('media', MediaSchema);
    } catch (e) {}
  }

  getInstance() {
    return model<Media>('media');
  }
}
