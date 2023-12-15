import { Module } from '@nestjs/common';
import { UsersBookIndexService } from '../../service/book/users.bookIndex.service';

@Module({
  imports: [],
  providers: [UsersBookIndexService],
  exports: [UsersBookIndexService],
})
export class UsersBookIndexModule {}
