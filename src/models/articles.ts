import { Article } from '@/interfaces/articles';
import { Schema, model } from 'mongoose';

export class ArticleModel {
  constructor() {
    const ArticleSchema: Schema = new Schema<Article>(
      {
        title: {
          type: String,
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          required: true,
        },
        createdBy: {
          type: Schema.Types.ObjectId,
          ref: 'user',
          required: true,
        },
      },
      { timestamps: true },
    );

    try {
      model('article', ArticleSchema);
    } catch (e) {}
  }

  getInstance() {
    return model<Article>('article');
  }
}
