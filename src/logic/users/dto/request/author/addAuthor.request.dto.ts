import { ApiProperty } from '@nestjs/swagger';
import * as joi from 'joi';

export class AddAuthorRequestDto {
  @ApiProperty({
    description: 'Author name',
    example: 'Test Author',
  })
  authorName: string;
}

export const AddAuthorValidation = joi.object({
  authorName: joi.string().required().min(1).max(50),
});
