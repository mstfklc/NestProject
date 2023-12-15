import { Module } from '@nestjs/common';
import { UsersCategoryModule } from './module/category/users.category.module';
import { UsersCategoryController } from './controller/category/users.category.controller';
import { UsersBookIndexModule } from './module/book/users.bookIndex.module';
import { UsersBookIndexController } from './controller/book/users.bookIndex.controller';

@Module({
  imports: [UsersCategoryModule, UsersBookIndexModule],
  controllers: [UsersCategoryController, UsersBookIndexController],
})
export class UsersModule {}
