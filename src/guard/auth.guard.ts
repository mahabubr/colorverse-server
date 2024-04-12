import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtHandler } from 'src/utils/jwtHandler';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();

      const { authorization }: any = request.headers;
      if (!authorization || authorization.trim() === '') {
        throw new UnauthorizedException('Please provide token');
      }
      const authToken = authorization;

      const resp = await JwtHandler.verify(authToken, process.env.JWT_SECRET);
      request.decodedData = resp;
      return true;
    } catch (error) {
      console.log('auth error - ', error.message);
    }
  }
}
