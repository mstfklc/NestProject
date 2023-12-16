import { Module } from '@nestjs/common';
import { UsersCategoryService } from '../../service/category/users.category.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from '../../../../schemas/category.schema';
import { BookSchema } from '../../../../schemas/book.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }]),
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
  ],
  providers: [UsersCategoryService],
  exports: [UsersCategoryService],
})
export class UsersCategoryModule {}
