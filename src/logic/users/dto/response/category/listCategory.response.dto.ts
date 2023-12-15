import { ApiProperty } from '@nestjs/swagger';
import { AllCategoryResponseDto } from './allCategory.response.dto';

export class ListCategoryResponseDto {
  @ApiProperty({ type: () => [AllCategoryResponseDto] })
  categories: AllCategoryResponseDto[];
}
