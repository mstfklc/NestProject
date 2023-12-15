import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';

export class LoginRequestDto {
  @ApiProperty({
    description: 'Email',
    example: 'test@gmail.com',
  })
  email: string;

  @ApiProperty({
    description: 'Password',
    example: '1234567M',
  })
  password: string;
}

export const AuthLoginValidation = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  password: Joi.string().required().min(8).regex(/[A-Z]/),
});
