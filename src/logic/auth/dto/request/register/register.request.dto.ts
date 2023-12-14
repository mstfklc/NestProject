import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';

export class RegisterRequestDto {
  @ApiProperty({
    description: 'Email',
    example: 'test@gmail.com',
  })
  email: string;
  @ApiProperty({
    description: 'Full name',
    example: 'Mustafa Kilic',
  })
  fullName: string;
  @ApiProperty({
    description: 'Password',
    example: '1234567M',
  })
  password: string;
}

export const AuthRegisterValidation = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  fullName: Joi.string().required(),
  password: Joi.string().required().min(8).regex(/[A-Z]/),
});
