import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { UsersAuthorService } from '../../service/author/users.author.service';
import { SuccessResponseDto } from '../../../../dto/success.response.dto';
import { JwtAuthGuard } from '../../../../custom/jwt/guard/jwt.guard';
import { AddAuthorRequestDto } from '../../dto/request/author/addAuthor.request.dto';
import { AuthRequestDto } from '../../../../custom/jwt/dto/auth.request.dto';
import { ListAuthorResponseDto } from '../../dto/response/author/listAuthor.response.dto';
import { Roles } from '../../../../custom/decorator/role/role.decorator';
import { Role } from '../../../../enum/role.enum';

@ApiTags('Users')
@ApiSecurity('access-token')
@Controller('author')
@Roles(Role.User)
export class UsersAuthorController {
  constructor(private usersAuthorService: UsersAuthorService) {}

  @Post()
  @ApiOkResponse({ type: SuccessResponseDto })
  @UseGuards(JwtAuthGuard)
  addAuthor(
    @Body() req: AddAuthorRequestDto,
    @Req() auth: AuthRequestDto,
  ): Promise<SuccessResponseDto> {
    return this.usersAuthorService.addAuthor(req, auth);
  }

  @Get()
  @ApiOkResponse({ type: ListAuthorResponseDto })
  @UseGuards(JwtAuthGuard)
  listAuthors(@Req() auth: AuthRequestDto): Promise<ListAuthorResponseDto> {
    return this.usersAuthorService.listAuthors(auth);
  }
}
