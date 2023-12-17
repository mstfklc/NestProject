import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import * as joi from 'joi';

export class DeleteAuthorRequestDto {
  @ApiProperty({
    type: 'ObjectId',
    description: 'Author ID',
    example: '5f8d3d5d3d5d3d5d3d5d3d5d',
    required: true,
  })
  authorID: ObjectId;
}

export const DeleteAuthorValidation = joi.object({
  authorID: joi.required(),
});
