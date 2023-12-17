import { AddAuthorRequestDto } from '../../../dto/request/author/addAuthor.request.dto';
import { AuthRequestDto } from '../../../../../custom/jwt/dto/auth.request.dto';
import { SuccessResponseDto } from '../../../../../dto/success.response.dto';
import { ListAuthorResponseDto } from '../../../dto/response/author/listAuthor.response.dto';

export interface UsersAuthorInterface {
  addAuthor(
    req: AddAuthorRequestDto,
    auth: AuthRequestDto,
  ): Promise<SuccessResponseDto>;

  listAuthors(auth: AuthRequestDto): Promise<ListAuthorResponseDto>;
}
