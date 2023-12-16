import { ApiOkResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersCategoryService } from '../../service/category/users.category.service';
import { SuccessResponseDto } from '../../../../dto/success.response.dto';
import { AddCategoryRequestDto } from '../../dto/request/category/addCategory.request.dto';
import { JwtAuthGuard } from '../../../../custom/jwt/guard/jwt.guard';
import { AuthRequestDto } from '../../../../custom/jwt/dto/auth.request.dto';
import { ListCategoryResponseDto } from '../../dto/response/category/listCategory.response.dto';
import { Roles } from '../../../../custom/decorator/role/role.decorator';
import { Role } from '../../../../enum/role.enum';
import { DeleteCategoryRequestDto } from '../../dto/request/category/deleteCategory.request.dto';

@ApiTags('Category')
@ApiSecurity('access-token')
@Controller('category')
@Roles(Role.User)
export class UsersCategoryController {
  constructor(private usersCategoryService: UsersCategoryService) {}

  @Post()
  @ApiOkResponse({ type: SuccessResponseDto })
  @UseGuards(JwtAuthGuard)
  addCategory(
    @Body() req: AddCategoryRequestDto,
    @Req() auth: AuthRequestDto,
  ): Promise<SuccessResponseDto> {
    return this.usersCategoryService.addCategory(req, auth);
  }

  @Get()
  @ApiOkResponse({ type: ListCategoryResponseDto })
  @UseGuards(JwtAuthGuard)
  listCategories(
    @Req() auth: AuthRequestDto,
  ): Promise<ListCategoryResponseDto> {
    return this.usersCategoryService.listCategories(auth);
  }

  @Delete()
  @ApiOkResponse({ type: SuccessResponseDto })
  @UseGuards(JwtAuthGuard)
  async deleteBook(
    @Body() req: DeleteCategoryRequestDto,
    @Req() auth: AuthRequestDto,
  ): Promise<SuccessResponseDto> {
    return await this.usersCategoryService.deleteCategory(req, auth);
  }
}
