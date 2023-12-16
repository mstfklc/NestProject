import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';

export class RegisterRequestDto {
  @ApiProperty({
    type: 'string',
    description: 'Email must be a valid email address',
    example: 'test@gmail.com',
    required: true,
  })
  email: string;
  @ApiProperty({
    type: 'string',
    description: 'Full name',
    example: 'Mustafa Kilic',
    required: true,
  })
  fullName: string;
  @ApiProperty({
    type: 'string',
    description:
      'Password must be at least 8 characters long and contain at least one uppercase letter',
    example: '1234567M',
    required: true,
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
