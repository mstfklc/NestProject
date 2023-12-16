import { ApiProperty } from '@nestjs/swagger';
import * as joi from 'joi';
import { ObjectId } from 'mongoose';

export class AddBookRequestDto {
  @ApiProperty({
    type: 'String',
    description: 'Book name must be min 1 and max 50 characters',
    example: 'Test Book',
    required: true,
  })
  bookName: string;

  @ApiProperty({
    type: 'Number',
    description: 'Book price',
    example: 100,
    required: true,
  })
  price: number;

  @ApiProperty({
    type: 'ObjectID',
    description: 'Author ID must be an ObjectID',
    example: '5f5d2a7e8d8e4c1a0c7f1b8d',
    required: true,
  })
  authorID: ObjectId;

  @ApiProperty({
    type: 'ObjectID',
    description: 'Category ID must be an array of ObjectID',
    example: ['5f5d2a7e8d8e4c1a0c7f1b8d', '5f5d2a7e8d8e4c1a0c7f1b8d'],
    required: true,
  })
  categoryID: ObjectId[];
}

export const AddBookValidation = joi.object({
  bookName: joi.string().required().min(1).max(50),
  price: joi.number().required(),
  authorID: joi.string().required(),
  categoryID: joi.required(),
});
