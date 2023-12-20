import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import * as joi from 'joi';

export class DeleteCategoryRequestDto {
  @ApiProperty({
    type: 'ObjectId',
    description: 'Category ID',
    example: '657c9a7a3c67ae26c23aa2e6',
    required: true,
  })
  categoryID: Types.ObjectId;
}

export const DeleteCategoryValidation = joi.object({
  categoryID: joi.required(),
});
