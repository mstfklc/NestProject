import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JWT_ENV } from '../../../../constant.core';
import { AuthLoginService } from '../../service/login/auth.login.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../../../../schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      global: true,
      secret: JWT_ENV.JWT_SECRET_KEY,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthLoginService],
  exports: [AuthLoginService],
})
export class AuthLoginModule {}
