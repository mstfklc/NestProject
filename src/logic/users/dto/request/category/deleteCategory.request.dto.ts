import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import * as joi from 'joi';

export class DeleteCategoryRequestDto {
  @ApiProperty({
    type: 'ObjectId',
    description: 'Category ID',
    example: '5f5d2a7e8d8e4c1a0c7f1b8d',
    required: true,
  })
  categoryID: Types.ObjectId;
}

export const DeleteCategoryValidation = joi.object({
  categoryID: joi.required(),
});
