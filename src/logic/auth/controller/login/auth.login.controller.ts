import { Body, Controller, Post } from '@nestjs/common';
import { AuthLoginService } from '../../service/login/auth.login.service';
import { LoginRequestDto } from '../../dto/request/login/login.request.dto';
import LoginResponseDto from '../../dto/response/login/login.response.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('login')
export class AuthLoginController {
  constructor(private authLoginService: AuthLoginService) {}

  @Post()
  login(@Body() req: LoginRequestDto): Promise<LoginResponseDto> {
    return this.authLoginService.login(req);
  }

  @Post('/admin')
  adminLogin(@Body() req: LoginRequestDto): Promise<LoginResponseDto> {
    return this.authLoginService.adminLogin(req);
  }
}
