import { ApiOkResponse, ApiQuery, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { Roles } from '../../../../custom/decorator/role/role.decorator';
import { Role } from '../../../../enum/role.enum';
import { UsersBookListService } from '../../service/book/users.bookList.service';
import { ShowBookDetailResponseDto } from '../../dto/response/book/showBookDetail.response.dto';
import { JwtAuthGuard } from '../../../../custom/jwt/guard/jwt.guard';
import { ListBookResponseDto } from '../../dto/request/book/listBook.response.dto';

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

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: ListBookResponseDto })
  @ApiQuery({ name: 'authorName', required: false })
  @ApiQuery({ name: 'categoryName', required: false })
  async listBook(
    @Query('authorName') authorName?: string,
    @Query('categoryName') categoryName?: string,
  ): Promise<ListBookResponseDto[]> {
    return await this.usersBookListService.listBook(authorName, categoryName);
  }
}
