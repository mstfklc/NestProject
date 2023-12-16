import { ApiProperty } from '@nestjs/swagger';
import * as joi from 'joi';

export class AddAuthorRequestDto {
  @ApiProperty({
    type: 'String',
    description: 'Author name must be between 1 and 50 characters',
    example: 'Test Author',
    required: true,
  })
  authorName: string;
}

export const AddAuthorValidation = joi.object({
  authorName: joi.string().required().min(1).max(50),
});
