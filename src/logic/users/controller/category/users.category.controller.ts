import { ApiOkResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UsersCategoryService } from '../../service/category/users.category.service';
import { SuccessResponseDto } from '../../../../dto/success.response.dto';
import { AddCategoryRequestDto } from '../../dto/request/category/addCategory.request.dto';
import { JwtAuthGuard } from '../../../../custom/jwt/guard/jwt.guard';
import { AuthRequestDto } from '../../../../custom/jwt/dto/auth.request.dto';
import { ListCategoryResponseDto } from '../../dto/response/category/listCategory.response.dto';

@ApiTags('Users')
@ApiSecurity('access-token')
@Controller('category')
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
  @ApiOkResponse({ type: SuccessResponseDto })
  @UseGuards(JwtAuthGuard)
  listCategories(
    @Req() auth: AuthRequestDto,
  ): Promise<ListCategoryResponseDto> {
    return this.usersCategoryService.listCategories(auth);
  }
}
