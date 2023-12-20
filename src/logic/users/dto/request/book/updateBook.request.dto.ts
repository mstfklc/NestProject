import { Types } from 'mongoose';
import * as joi from 'joi';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookRequestDto {
  @ApiProperty({
    type: 'ObjectId',
    description: 'Book ID',
    example: '657c9a7a3c67ae26c23aa2e6',
    required: true,
  })
  bookID: Types.ObjectId;
  @ApiProperty({
    type: 'String',
    description: 'Book name must be between 1 and 50 characters',
    example: 'Test Book',
    required: false,
  })
  bookName?: string;
  @ApiProperty({
    type: 'Number',
    description: 'Book price',
    example: 100,
    required: false,
  })
  price?: number;
  @ApiProperty({
    type: 'ObjectId',
    description: 'Author ID',
    example: '657c9a7a3c67ae26c23aa2e6',
    required: false,
  })
  authorID?: Types.ObjectId;
  @ApiProperty({
    type: 'ObjectId',
    description: 'Category ID must be an array of ObjectIds',
    example: '["657c9a7a3c67ae26c23aa2e6"]',
    required: false,
  })
  categoryID?: Types.ObjectId[];
}

export const UpdateBookValidation = joi.object({
  bookID: joi.required(),
  bookName: joi.string().min(1).max(50).optional(),
  price: joi.number().optional(),
  authorID: joi.optional(),
  categoryID: joi.array().optional(),
});
