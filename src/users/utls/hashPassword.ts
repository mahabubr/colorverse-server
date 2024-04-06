import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashPassword {
  async hash(password: string, saltRounds: number): Promise<string> {
    return await bcrypt.hash(password, saltRounds);
  }
}
