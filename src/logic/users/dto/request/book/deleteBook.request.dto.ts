import { ObjectId } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as joi from 'joi';

export class DeleteBookRequestDto {
  @ApiProperty({
    type: 'ObjectId',
    description: 'Book ID must be ObjectId',
    example: '5f1e7e9a0c4c9b3e6c0c9e3b',
    required: true,
  })
  bookID: ObjectId;
}

export const DeleteBookValidation = joi.object({
  bookID: joi.string().required(),
});
