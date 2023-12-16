import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import * as joi from 'joi';

export class DeleteCategoryRequestDto {
  @ApiProperty({
    description: 'Category ID',
    example: '5f5d2a7e8d8e4c1a0c7f1b8d',
  })
  categoryID: ObjectId;
}

export const DeleteCategoryValidation = joi.object({
  categoryID: joi.required(),
});
