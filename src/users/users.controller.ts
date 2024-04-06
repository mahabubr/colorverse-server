import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUserDto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  private createResponse(status: HttpStatus, message: string, data?: any) {
    return {
      status,
      message,
      data,
    };
  }

  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const result = await this.userService.createUser(createUserDto);
      return this.createResponse(
        HttpStatus.OK,
        'User Create Successful',
        result,
      );
    } catch (error) {
      return this.createResponse(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Failed to create user',
        error.message,
      );
    }
  }
}
