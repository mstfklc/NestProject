import { ApiProperty } from '@nestjs/swagger';
import { AllAuthorResponseDto } from './allAuthor.response.dto';

export class ListAuthorResponseDto {
  @ApiProperty({ type: () => [AllAuthorResponseDto] })
  authors: AllAuthorResponseDto[];
}
