import { ApiProperty } from '@nestjs/swagger';

export class AllCategoryResponseDto {
  @ApiProperty({
    type: 'string',
    description: 'Category ObjectID',
    example: '123123123123123123123',
  })
  categoryID: string;
  @ApiProperty({
    type: 'string',
    description: 'Category name',
    example: 'Test Category Name',
  })
  categoryName: string;
}
