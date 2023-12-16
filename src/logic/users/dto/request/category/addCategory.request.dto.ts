import * as joi from 'joi';
import { ApiProperty } from '@nestjs/swagger';

export class AddCategoryRequestDto {
  @ApiProperty({
    description: 'Category name must be between 1 and 50 characters',
    example: 'Test Category',
    required: true,
  })
  categoryName: string;
}

export const AddCategoryValidation = joi.object({
  categoryName: joi.string().required().min(1).max(50),
});
