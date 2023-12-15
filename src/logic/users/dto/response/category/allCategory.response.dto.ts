import { ApiProperty } from '@nestjs/swagger';

export class AllCategoryResponseDto {
  @ApiProperty({
    type: 'string',
    description: 'Category id',
  })
  categoryID: string;
  @ApiProperty({
    type: 'string',
    description: 'Category name',
  })
  categoryName: string;
}
