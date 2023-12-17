import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Author } from '../../../../schemas/author.schema';
import mongoose from 'mongoose';
import { SuccessResponseDto } from '../../../../dto/success.response.dto';
import { AuthRequestDto } from '../../../../custom/jwt/dto/auth.request.dto';
import {
  AddAuthorRequestDto,
  AddAuthorValidation,
} from '../../dto/request/author/addAuthor.request.dto';
import { throwApiError } from '../../../../util/http.utility';
import { CustomExceptionCode } from '../../../../enum/customExceptionCode.enum';
import { ApiErrorEnum } from '../../../../enum/apiError.enum';
import { ListAuthorResponseDto } from '../../dto/response/author/listAuthor.response.dto';
import { UsersAuthorInterface } from './users.author.interface';

@Injectable()
export class UsersAuthorService implements UsersAuthorInterface {
  constructor(
    @InjectModel(Author.name)
    private authorModel: mongoose.Model<Author>,
  ) {}

  async addAuthor(
    req: AddAuthorRequestDto,
    auth: AuthRequestDto,
  ): Promise<SuccessResponseDto> {
    try {
      await AddAuthorValidation.validateAsync(req);
    } catch (err) {
      throwApiError(
        CustomExceptionCode.BAD_REQUEST,
        ApiErrorEnum.api_error_invalid_input_data,
      );
    }
    const author = await this.authorModel.findOne({
      AuthorName: req.authorName,
      UserID: auth.user.id,
      IsDeleted: false,
    });
    if (author) {
      throwApiError(
        CustomExceptionCode.API_ERROR,
        ApiErrorEnum.api_error_author_already_exists,
      );
    }
    await this.authorModel.create({
      AuthorName: req.authorName,
      UserID: auth.user.id,
    });
    return Promise.resolve({ status: true });
  }

  async listAuthors(auth: AuthRequestDto): Promise<ListAuthorResponseDto> {
    const authorCheck = await this.authorModel.find({
      UserID: auth.user.id,
      IsDeleted: false,
    });
    const response: ListAuthorResponseDto = {
      authors: authorCheck.map((author) => ({
        authorID: author._id.toString(),
        authorName: author.AuthorName,
      })),
    };
    return Promise.resolve(response);
  }
}
