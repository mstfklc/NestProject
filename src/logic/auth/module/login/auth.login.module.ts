import { Module } from '@nestjs/common';
import { AuthLoginService } from '../../service/login/auth.login.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../../../../schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [AuthLoginService],
  exports: [AuthLoginService],
})
export class AuthLoginModule {}
