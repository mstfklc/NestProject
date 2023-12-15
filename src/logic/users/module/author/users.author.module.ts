import { Module } from '@nestjs/common';
import { UsersAuthorService } from '../../service/author/users.author.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorSchema } from '../../../../schemas/author.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Author', schema: AuthorSchema }]),
  ],
  providers: [UsersAuthorService],
  exports: [UsersAuthorService],
})
export class UsersAuthorModule {}
