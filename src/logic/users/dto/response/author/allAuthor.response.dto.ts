import { ApiProperty } from '@nestjs/swagger';

export class AllAuthorResponseDto {
  @ApiProperty({
    type: 'string',
    description: 'Author id',
    example: '1123123123123123123',
  })
  authorID: string;
  @ApiProperty({
    type: 'string',
    description: 'Author name',
    example: 'John Doe',
  })
  authorName: string;
}
