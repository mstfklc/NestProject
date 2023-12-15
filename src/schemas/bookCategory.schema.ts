import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Book } from './book.schema';
import { Category } from './category.schema';
import { User } from './user.schema';

export type BookCategoryDocument = BookCategory & Document;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class BookCategory {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  })
  BookID: Book;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  })
  CategoryID: Category;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  UserID: User;
  @Prop({
    type: Boolean,
    default: false,
  })
  IsDeleted: boolean;
}

export const BookCategorySchema = SchemaFactory.createForClass(BookCategory);
