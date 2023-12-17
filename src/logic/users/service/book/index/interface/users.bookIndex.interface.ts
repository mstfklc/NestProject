import { AddBookRequestDto } from '../../../../dto/request/book/addBook.request.dto';
import { DeleteBookRequestDto } from '../../../../dto/request/book/deleteBook.request.dto';
import { UpdateBookRequestDto } from '../../../../dto/request/book/updateBook.request.dto';
import { AuthRequestDto } from '../../../../../../custom/jwt/dto/auth.request.dto';
import { SuccessResponseDto } from '../../../../../../dto/success.response.dto';

export interface UsersBookIndexInterface {
  addBook(
    req: AddBookRequestDto,
    auth: AuthRequestDto,
  ): Promise<SuccessResponseDto>;

  deleteBook(
    req: DeleteBookRequestDto,
    auth: AuthRequestDto,
  ): Promise<SuccessResponseDto>;

  updateBook(
    req: UpdateBookRequestDto,
    auth: AuthRequestDto,
  ): Promise<SuccessResponseDto>;
}
