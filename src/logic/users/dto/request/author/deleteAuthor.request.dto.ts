import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import * as joi from 'joi';

export class DeleteAuthorRequestDto {
  @ApiProperty({
    type: 'ObjectId',
    description: 'Author ID',
    example: '657c9a7a3c67ae26c23aa2e6',
    required: true,
  })
  authorID: Types.ObjectId;
}

export const DeleteAuthorValidation = joi.object({
  authorID: joi.required(),
});
