import { ApiProperty } from '@nestjs/swagger';

export default class LoginResponse {
  @ApiProperty()
  token: string;

  constructor(token: string) {
    this.token = token;
  }
}
