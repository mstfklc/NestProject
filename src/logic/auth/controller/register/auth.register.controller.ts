import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthRegisterService } from '../../service/register/auth.register.service';
import { RegisterRequestDto } from '../../dto/request/register/register.request.dto';
import { SuccessResponseDto } from '../../../../dto/success.response.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('register')
export class AuthRegisterController {
  constructor(private authRegisterService: AuthRegisterService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  register(@Body() request: RegisterRequestDto): Promise<SuccessResponseDto> {
    return this.authRegisterService.register(request);
  }
}
