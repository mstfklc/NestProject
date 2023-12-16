// list-book-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

class AuthorDto {
  @ApiProperty()
  AuthorName: string;
}

class CategoryDto {
  @ApiProperty()
  CategoryName: string;
}

export class ListBookResponseDto {
  @ApiProperty()
  bookName: string;

  @ApiProperty()
  price: number;

  @ApiProperty({ type: AuthorDto })
  author: AuthorDto;

  @ApiProperty({ type: [CategoryDto] })
  categories: CategoryDto[];
}
