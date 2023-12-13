import { ApiProperty } from '@nestjs/swagger';
import { JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';

export class RegisterRequestDto {
  @ApiProperty()
  @JoiSchema(Joi.string().required().email())
  email: string;
  @ApiProperty()
  @JoiSchema(Joi.string().required())
  fullName: string;
  @ApiProperty()
  @JoiSchema(
    Joi.string()
      .required()
      .min(8)
      .regex(/[A-Z]/)
      .error(new Error('Password must contain at least one uppercase letter')),
  )
  password: string;
}
