import { ApiProperty } from '@nestjs/swagger';

export class AllAuthorResponseDto {
  @ApiProperty({
    type: 'string',
    description: 'Author id',
  })
  authorID: string;
  @ApiProperty({
    type: 'string',
    description: 'Author name',
  })
  authorName: string;
}
