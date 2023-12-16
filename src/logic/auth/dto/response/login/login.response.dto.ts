import { ApiProperty } from '@nestjs/swagger';

export default class LoginResponseDto {
  @ApiProperty({
    description: 'JWT Token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test.test',
  })
  token: string;

  constructor(token: string) {
    this.token = token;
  }
}
