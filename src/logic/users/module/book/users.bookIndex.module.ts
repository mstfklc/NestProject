import { Module } from '@nestjs/common';
import { UsersBookIndexService } from '../../service/book/index/users.bookIndex.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from '../../../../schemas/book.schema';
import { CategorySchema } from '../../../../schemas/category.schema';
import { AuthorSchema } from '../../../../schemas/author.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }]),
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
    MongooseModule.forFeature([{ name: 'Author', schema: AuthorSchema }]),
  ],
  providers: [UsersBookIndexService],
  exports: [UsersBookIndexService],
})
export class UsersBookIndexModule {}
