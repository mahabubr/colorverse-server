import {
  Body,
  Controller,
  Headers,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/loginDto';
import { Response } from '../utils/response';
import { SecretDto } from './dto/secretDto';
import { AuthGuard } from '../guard/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      const result = await this.authService.login(loginDto);
      return Response.create(HttpStatus.OK, 'Access token accepted', result);
    } catch (error) {
      return Response.create(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Failed to generate access token',
        error.message,
      );
    }
  }

  @Post('refresh-token')
  async refreshToken(@Body() secret: SecretDto) {
    try {
      const result = await this.authService.refreshToken(secret);
      return Response.create(HttpStatus.OK, 'Refresh token accepted', result);
    } catch (error) {
      return Response.create(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Failed to generate refresh token',
        error.message,
      );
    }
  }

  @Post('me')
  @UseGuards(AuthGuard)
  async me(@Headers('authorization') token: string) {
    try {
      const result = await this.authService.me(token);
      return Response.create(HttpStatus.OK, 'Me get successful', result);
    } catch (error) {
      return Response.create(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Something went wrong',
        error.message,
      );
    }
  }
}
