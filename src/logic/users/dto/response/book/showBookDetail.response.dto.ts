import { ApiProperty } from '@nestjs/swagger';

export class ShowBookDetailResponseDto {
  @ApiProperty({
    example: 'Test Book',
    description: 'Book Name',
  })
  bookName: string;
  @ApiProperty({
    example: 100,
    description: 'Book Price',
  })
  price: number;
  @ApiProperty({
    example: 'Test Author',
    description: 'Author Name',
  })
  authorName: string;
  @ApiProperty({
    example: ['Test Category 1', 'Test Category 2'],
    description: 'Book Category Name',
  })
  bookCategoryName: string[];
}
