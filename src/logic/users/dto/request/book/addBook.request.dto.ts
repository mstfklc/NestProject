import { ApiProperty } from '@nestjs/swagger';
import * as joi from 'joi';
import { ObjectId } from 'mongoose';

export class AddBookRequestDto {
  @ApiProperty({
    description: 'Book name',
    example: 'Test Book',
  })
  bookName: string;

  @ApiProperty({
    description: 'Book price',
    example: 100,
  })
  price: number;

  @ApiProperty({
    description: 'Author ID',
    example: '5f5d2a7e8d8e4c1a0c7f1b8d',
  })
  authorID: ObjectId;

  @ApiProperty({
    description: 'Category ID',
    example: ['5f5d2a7e8d8e4c1a0c7f1b8d', '5f5d2a7e8d8e4c1a0c7f1b8d'],
  })
  categoryID: ObjectId[];
}

export const AddBookValidation = joi.object({
  bookName: joi.string().required().min(1).max(50),
  price: joi.number().required(),
  authorID: joi.string().required(),
  categoryID: joi.required(),
});
