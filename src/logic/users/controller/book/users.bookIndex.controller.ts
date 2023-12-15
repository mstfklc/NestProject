import {
  Body,
  Controller,
  Delete,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersBookIndexService } from '../../service/book/users.bookIndex.service';
import { ApiOkResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AddBookRequestDto } from '../../dto/request/book/addBook.request.dto';
import { AuthRequestDto } from '../../../../custom/jwt/dto/auth.request.dto';
import { SuccessResponseDto } from '../../../../dto/success.response.dto';
import { JwtAuthGuard } from '../../../../custom/jwt/guard/jwt.guard';
import { DeleteBookRequestDto } from '../../dto/request/book/deleteBook.request.dto';
import { UpdateBookRequestDto } from '../../dto/request/book/updateBook.request.dto';
import { Roles } from '../../../../custom/decorator/role/role.decorator';
import { Role } from '../../../../enum/role.enum';

@ApiTags('Users')
@ApiSecurity('access-token')
@Controller('book')
@Roles(Role.User)
export class UsersBookIndexController {
  constructor(private usersBookIndexService: UsersBookIndexService) {}

  @Post()
  @ApiOkResponse({ type: SuccessResponseDto })
  @UseGuards(JwtAuthGuard)
  async addBook(
    @Body() req: AddBookRequestDto,
    @Req() auth: AuthRequestDto,
  ): Promise<SuccessResponseDto> {
    return await this.usersBookIndexService.addBook(req, auth);
  }

  @Delete()
  @ApiOkResponse({ type: SuccessResponseDto })
  @UseGuards(JwtAuthGuard)
  async deleteBook(
    @Body() req: DeleteBookRequestDto,
    @Req() auth: AuthRequestDto,
  ): Promise<SuccessResponseDto> {
    return await this.usersBookIndexService.deleteBook(req, auth);
  }

  @Put()
  @ApiOkResponse({ type: SuccessResponseDto })
  @UseGuards(JwtAuthGuard)
  async updateBook(
    @Body() req: UpdateBookRequestDto,
    @Req() auth: AuthRequestDto,
  ): Promise<SuccessResponseDto> {
    return await this.usersBookIndexService.updateBook(req, auth);
  }
}
