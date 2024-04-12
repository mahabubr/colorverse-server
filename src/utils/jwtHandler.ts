import { User } from '@prisma/client';
import * as jwt from 'jsonwebtoken';
import { jwtDecode } from 'jwt-decode';

export class JwtHandler {
  static sign(payload: Partial<User>, secret: jwt.Secret, expiresIn: any) {
    return jwt.sign(payload, secret, expiresIn);
  }

  static verify(token: string, secret: jwt.Secret) {
    return jwt.verify(token, secret);
  }
  static decode(token: string) {
    return jwtDecode(token);
  }
}
