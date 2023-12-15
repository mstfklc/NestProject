import { Module } from '@nestjs/common';
import { UsersCategoryModule } from './module/category/users.category.module';
import { UsersCategoryController } from './controller/category/users.category.controller';
import { UsersBookIndexModule } from './module/book/users.bookIndex.module';
import { UsersBookIndexController } from './controller/book/users.bookIndex.controller';
import { UsersAuthorModule } from './module/author/users.author.module';
import { UsersAuthorController } from './controller/author/users.author.controller';

@Module({
  imports: [UsersCategoryModule, UsersBookIndexModule, UsersAuthorModule],
  controllers: [
    UsersCategoryController,
    UsersBookIndexController,
    UsersAuthorController,
  ],
})
export class UsersModule {}
