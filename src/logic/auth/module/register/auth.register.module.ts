import { Module } from '@nestjs/common';
import { AuthRegisterService } from '../../service/register/auth.register.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../../../../schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [AuthRegisterService],
  exports: [AuthRegisterService],
})
export class AuthRegisterModule {}
