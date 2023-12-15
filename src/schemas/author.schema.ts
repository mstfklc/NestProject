import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './user.schema';

export type AuthorDocument = Author & Document;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Author {
  @Prop({ unique: [true, 'Duplicate author name entered'] })
  AuthorName: string;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  UserID: User;
  @Prop({ default: false })
  IsDeleted: boolean;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
