import { Module } from '@nestjs/common';
import { UsersCategoryService } from '../../service/category/users.category.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from '../../../../schemas/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
  ],
  providers: [UsersCategoryService],
  exports: [UsersCategoryService],
})
export class UsersCategoryModule {}
