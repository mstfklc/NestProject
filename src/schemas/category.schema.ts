import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './user.schema';

export type CategoryDocument = Category & Document;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Category {
  @Prop({ unique: [true, 'Duplicate category name entered'] })
  CategoryName: string;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  UserID: User;
  @Prop({ default: false })
  IsDeleted: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
