import { Body, Controller, Post } from '@nestjs/common';
import { AuthLoginService } from '../../service/login/auth.login.service';
import { LoginRequest } from '../../dto/request/login/login.request';
import LoginResponse from '../../dto/response/login/login.response';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('login')
export class AuthLoginController {
  constructor(private authLoginService: AuthLoginService) {}

  @Post()
  login(@Body() req: LoginRequest): Promise<LoginResponse> {
    return this.authLoginService.login(req);
  }

  @Post('/admin')
  adminLogin(@Body() req: LoginRequest): Promise<LoginResponse> {
    return this.authLoginService.adminLogin(req);
  }
}
