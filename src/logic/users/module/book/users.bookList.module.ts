import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from '../../../../schemas/book.schema';
import { CategorySchema } from '../../../../schemas/category.schema';
import { AuthorSchema } from '../../../../schemas/author.schema';
import { UsersBookListService } from '../../service/book/list/users.bookList.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }]),
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
    MongooseModule.forFeature([{ name: 'Author', schema: AuthorSchema }]),
  ],
  providers: [UsersBookListService],
  exports: [UsersBookListService],
})
export class UsersBookListModule {}
