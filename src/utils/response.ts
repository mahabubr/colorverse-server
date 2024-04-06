import { HttpStatus } from '@nestjs/common';

export class Response {
  static create(
    status: HttpStatus,
    message: string,
    data: any,
    total?: number,
    page?: number,
    limit?: number,
  ) {
    return {
      status,
      message,
      data,
      meta: {
        total: total !== undefined ? Number(total) : undefined,
        page: page !== undefined ? Number(page) : undefined,
        limit: limit !== undefined ? Number(limit) : undefined,
      },
    };
  }
}
