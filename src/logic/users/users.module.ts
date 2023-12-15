import { Module } from '@nestjs/common';
import { UsersCategoryModule } from './module/category/users.category.module';
import { UsersCategoryController } from './controller/category/users.category.controller';

@Module({
  imports: [UsersCategoryModule],
  controllers: [UsersCategoryController],
})
export class UsersModule {}
