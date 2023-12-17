import { Module } from '@nestjs/common';
import { UsersAuthorService } from '../../service/author/users.author.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorSchema } from '../../../../schemas/author.schema';
import { BookSchema } from '../../../../schemas/book.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Author', schema: AuthorSchema }]),
    MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }]),
  ],
  providers: [UsersAuthorService],
  exports: [UsersAuthorService],
})
export class UsersAuthorModule {}
