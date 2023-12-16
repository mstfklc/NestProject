import { ApiProperty } from '@nestjs/swagger';

export class ShowBookDetailResponseDto {
  @ApiProperty({
    type: 'String',
    example: 'Test Book',
    description: 'Book Name',
  })
  bookName: string;
  @ApiProperty({
    type: 'Number',
    example: 100,
    description: 'Book Price',
  })
  price: number;
  @ApiProperty({
    type: 'String',
    example: 'Test Author',
    description: 'Author Name',
  })
  authorName: string;
  @ApiProperty({
    type: 'String',
    example: ['Test Category 1', 'Test Category 2'],
    description: 'Book Category Name',
  })
  bookCategoryName: string[];
}
