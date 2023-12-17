import { AuthRequestDto } from '../../../../../custom/jwt/dto/auth.request.dto';
import { ShowBookDetailResponseDto } from '../../../dto/response/book/showBookDetail.response.dto';
import { ListBookResponseDto } from '../../../dto/response/book/listBook.response.dto';

export interface UsersBookListInterface {
  showBookDetail(
    auth: AuthRequestDto,
    bookID: string,
  ): Promise<ShowBookDetailResponseDto>;

  listBook(
    auth: AuthRequestDto,
    authorName?: string,
    categoryName?: string,
  ): Promise<ListBookResponseDto[]>;
}
