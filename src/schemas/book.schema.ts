import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Author } from './author.schema';
import { User } from './user.schema';
import { Category } from './category.schema';

export type BookDocument = Book & Document;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Book {
  @Prop({ required: true })
  BookName: string;
  @Prop({ required: true })
  Price: number;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true,
  })
  AuthorID: Author;
  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Category',
    required: true,
  })
  CategoryID: Category[];
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  UserID: User;
  @Prop({ default: false })
  IsDeleted: boolean;
}

export const BookSchema = SchemaFactory.createForClass(Book);
