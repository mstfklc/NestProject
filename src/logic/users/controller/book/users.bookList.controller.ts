import { ApiOkResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { Roles } from '../../../../custom/decorator/role/role.decorator';
import { Role } from '../../../../enum/role.enum';
import { UsersBookListService } from '../../service/book/users.bookList.service';
import { ShowBookDetailResponseDto } from '../../dto/response/book/showBookDetail.response.dto';
import { JwtAuthGuard } from '../../../../custom/jwt/guard/jwt.guard';

@ApiTags('Book')
@ApiSecurity('access-token')
@Controller('book/list')
@Roles(Role.User)
export class UsersBookListController {
  constructor(private usersBookListService: UsersBookListService) {}

  @Get(':bookID')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: ShowBookDetailResponseDto })
  async showBookDetail(
    @Param('bookID') bookID: string,
  ): Promise<ShowBookDetailResponseDto> {
    return await this.usersBookListService.showBookDetail(bookID);
  }
}
