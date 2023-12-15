import * as joi from 'joi';
import { ApiProperty } from '@nestjs/swagger';

export class AddCategoryRequestDto {
  @ApiProperty({
    description: 'Category name',
    example: 'Test Category',
  })
  categoryName: string;
}

export const AddCategoryValidation = joi.object({
  categoryName: joi.string().required().min(1).max(50),
});
