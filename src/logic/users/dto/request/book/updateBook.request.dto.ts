import { ObjectId } from 'mongoose';
import * as joi from 'joi';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookRequestDto {
  @ApiProperty({
    type: 'ObjectId',
    description: 'Book ID',
    example: '5f5d2a7e8d8e4c1a0c7f1b8d',
    required: true,
  })
  bookID: ObjectId;
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
    example: '5f5d2a7e8d8e4c1a0c7f1b8d',
    required: false,
  })
  authorID?: ObjectId;
  @ApiProperty({
    type: 'ObjectId',
    description: 'Category ID must be an array of ObjectIds',
    example: '["5f5d2a7e8d8e4c1a0c7f1b8d"]',
    required: false,
  })
  categoryID?: ObjectId[];
}

export const UpdateBookValidation = joi.object({
  bookID: joi.string().required(),
  bookName: joi.string().min(1).max(50),
  price: joi.number(),
  authorID: joi.string(),
  categoryID: joi.array().items(joi.string()),
});
