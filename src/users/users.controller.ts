import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUserDto';
import { Response } from '../utils/response';
import { UpdateUserDto } from './dto/updateUserDto';
import { AuthGuard } from '../guard/auth.guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const result = await this.userService.createUser(createUserDto);
      return Response.create(HttpStatus.OK, 'User Create Successful', result);
    } catch (error) {
      return Response.create(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Failed to create user',
        error.message,
      );
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  async getUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search: string = '',
  ) {
    try {
      const result = await this.userService.getUsers(page, limit, search);
      return Response.create(
        HttpStatus.OK,
        'User get successful',
        result.data,
        result.total,
        page,
        limit,
      );
    } catch (error) {
      return Response.create(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Failed to get users',
        error.message,
      );
    }
  }

  @Get('top-contributor')
  // @UseGuards(AuthGuard)
  async getTopContributor() {
    try {
      const result = await this.userService.getTopContributor();
      return Response.create(
        HttpStatus.OK,
        'Top contributor get successful',
        result,
      );
    } catch (error) {
      return Response.create(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Failed to get top contributor',
        error.message,
      );
    }
  }

  @Get('recent-users')
  // @UseGuards(AuthGuard)
  async getRecentUsers() {
    try {
      const result = await this.userService.getRecentUsers();
      return Response.create(
        HttpStatus.OK,
        'Recent users get successful',
        result,
      );
    } catch (error) {
      return Response.create(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Failed to get recent users',
        error.message,
      );
    }
  }

  @Get(':id')
  async getSingleUser(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const result = await this.userService.getSingleUser(id);
      return Response.create(HttpStatus.OK, 'User get successful', result);
    } catch (error) {
      return Response.create(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Failed to get users',
        error.message,
      );
    }
  }

  @Patch(':id')
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const result = await this.userService.updateUser(id, updateUserDto);
      return Response.create(HttpStatus.OK, 'User update successful', result);
    } catch (error) {
      return Response.create(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Failed to update users',
        error.message,
      );
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const result = await this.userService.deleteUser(id);
      return Response.create(HttpStatus.OK, 'User delete successful', result);
    } catch (error) {
      return Response.create(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Failed to delete users',
        error.message,
      );
    }
  }
}
