import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as joi from 'joi';

export class DeleteBookRequestDto {
  @ApiProperty({
    type: 'ObjectId',
    description: 'Book ID must be ObjectId',
    example: '657c9a7a3c67ae26c23aa2e6',
    required: true,
  })
  bookID: Types.ObjectId;
}

export const DeleteBookValidation = joi.object({
  bookID: joi.required(),
});
