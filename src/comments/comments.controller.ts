import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comments.service';
import { AuthGuard } from 'src/guard/auth.guard';
import { CreateCommentDto } from './dto/comments.dto';
import { Response } from 'src/utils/response';

@Controller('comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  async createComments(@Body() createCommentDto: CreateCommentDto) {
    try {
      const result = await this.commentService.createComments(createCommentDto);
      return Response.create(HttpStatus.OK, 'Comment Post Successful', result);
    } catch (error) {
      return Response.create(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Failed to create comment',
        error.message,
      );
    }
  }

  @Get('recent')
  async getRecentComments() {
    try {
      const result = await this.commentService.getRecentComments();
      return Response.create(
        HttpStatus.OK,
        'Recent comment Get Successful',
        result,
      );
    } catch (error) {
      return Response.create(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Failed to get recent comment',
        error.message,
      );
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getComment(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const result = await this.commentService.getAllComments(id);
      return Response.create(HttpStatus.OK, 'Comment Get Successful', result);
    } catch (error) {
      return Response.create(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Failed to get comment',
        error.message,
      );
    }
  }
}
