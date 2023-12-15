import { ApiProperty } from '@nestjs/swagger';

export default class LoginResponseDto {
  @ApiProperty()
  token: string;

  constructor(token: string) {
    this.token = token;
  }
}
