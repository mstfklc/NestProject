import { AddCategoryRequestDto } from '../../dto/request/category/addCategory.request.dto';
import { AuthRequestDto } from '../../../../custom/jwt/dto/auth.request.dto';
import { SuccessResponseDto } from '../../../../dto/success.response.dto';
import { ListCategoryResponseDto } from '../../dto/response/category/listCategory.response.dto';
import { DeleteCategoryRequestDto } from '../../dto/request/category/deleteCategory.request.dto';

export interface UsersCategoryInterface {
  addCategory(
    req: AddCategoryRequestDto,
    auth: AuthRequestDto,
  ): Promise<SuccessResponseDto>;

  listCategories(auth: AuthRequestDto): Promise<ListCategoryResponseDto>;

  deleteCategory(
    req: DeleteCategoryRequestDto,
    auth: AuthRequestDto,
  ): Promise<SuccessResponseDto>;
}
