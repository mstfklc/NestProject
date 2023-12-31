// list-book-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

class AuthorDto {
  @ApiProperty({
    description: 'Author Name',
    example: 'Test Author',
  })
  AuthorName: string;
}

class CategoryDto {
  @ApiProperty({
    description: 'Category Name',
    example: 'Test Category',
  })
  CategoryName: string;
}

export class ListBookResponseDto {
  @ApiProperty({
    description: 'Book ID',
    example: '5f8c8a5a5d3d2e2d3c1e2d3f',
  })
  bookID: string;
  @ApiProperty({
    description: 'Book Name',
    example: 'Test Book',
  })
  bookName: string;

  @ApiProperty({
    description: 'Book Price',
    example: 100,
  })
  price: number;

  @ApiProperty({ type: AuthorDto })
  author: AuthorDto;

  @ApiProperty({ type: [CategoryDto] })
  categories: CategoryDto[];
}
