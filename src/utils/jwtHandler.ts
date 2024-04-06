import { User } from '@prisma/client';
import * as jwt from 'jsonwebtoken';

export class JwtHandler {
  static sign(payload: Partial<User>, secret: jwt.Secret, expiresIn: any) {
    return jwt.sign(payload, secret, expiresIn);
  }

  static verify(token: string, secret: jwt.Secret) {
    return jwt.verify(token, secret);
  }
}
