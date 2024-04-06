import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/loginDto';
import { Response } from 'src/utils/response';
import { SecretDto } from './dto/secretDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      const result = await this.authService.login(loginDto);
      return Response.create(HttpStatus.OK, 'Access token generating', result);
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
      return Response.create(HttpStatus.OK, 'Refresh token generating', result);
    } catch (error) {
      return Response.create(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Failed to generate refresh token',
        error.message,
      );
    }
  }
}
