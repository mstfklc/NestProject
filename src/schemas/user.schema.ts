import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../enum/role.enum';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class User {
  @Prop({ required: true })
  FullName: string;
  @Prop({ unique: [true, 'Duplicate email entered'] })
  Email: string;
  @Prop({ required: true })
  PasswordHashed: string;
  @Prop({ default: false })
  IsDeleted: boolean;
  @Prop({ default: Role.User })
  Roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
