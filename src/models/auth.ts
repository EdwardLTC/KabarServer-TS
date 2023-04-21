import { User } from '@/interfaces/users';
import { Auth } from '@interfaces/auth';
import { Schema, model } from 'mongoose';
import { JWT_SECRET } from '@/config';
import Jwt from 'jsonwebtoken';
export class AuthModel {
  constructor() {
    const AuthSchema: Schema = new Schema<Auth>(
      {
        token: {
          type: String,
          required: true,
        },
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
      },
      { timestamps: true },
    );

    try {
      model<Auth>('Auth', AuthSchema);
    } catch (error) {}
  }

  generateToken = (user: User) => {
    const token = Jwt.sign(
      {
        _id: user._id.toString(),
        email: user.email,
        name: user.name,
        address: user.address,
        phone: user.phone,
        avatar: user.avatar,
      },
      JWT_SECRET,
      {
        expiresIn: '1h',
        algorithm: 'HS256',
      },
    );
    return token;
  };

  verifyToken = (token: string) => {
    const decoded = Jwt.verify(token, JWT_SECRET);
    return decoded;
  };

  getInstace() {
    return model<Auth>('Auth');
  }
}
