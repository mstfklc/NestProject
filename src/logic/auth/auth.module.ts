import { Module } from '@nestjs/common';
import { AuthLoginModule } from './module/login/auth.login.module';
import { AuthLoginController } from './controller/login/auth.login.controller';
import { AuthRegisterModule } from './module/register/auth.register.module';
import { AuthRegisterController } from './controller/register/auth.register.controller';

@Module({
  imports: [AuthLoginModule, AuthRegisterModule],
  controllers: [AuthLoginController, AuthRegisterController],
})
export class AuthModule {}
