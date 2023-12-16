import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from '../../../../schemas/book.schema';
import mongoose from 'mongoose';
import { SuccessResponseDto } from '../../../../dto/success.response.dto';
import {
  AddBookRequestDto,
  AddBookValidation,
} from '../../dto/request/book/addBook.request.dto';
import { AuthRequestDto } from '../../../../custom/jwt/dto/auth.request.dto';
import { throwApiError } from '../../../../util/http.utility';
import { ApiErrorEnum } from '../../../../enum/apiError.enum';
import { CustomExceptionCode } from '../../../../enum/customExceptionCode.enum';
import { Author } from '../../../../schemas/author.schema';
import { Category } from '../../../../schemas/category.schema';
import {
  DeleteBookRequestDto,
  DeleteBookValidation,
} from '../../dto/request/book/deleteBook.request.dto';
import { UpdateBookRequestDto } from '../../dto/request/book/updateBook.request.dto';

@Injectable()
export class UsersBookIndexService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
    @InjectModel(Author.name)
    private authorModel: mongoose.Model<Author>,
    @InjectModel(Category.name)
    private categoryModel: mongoose.Model<Category>,
  ) {}

  async addBook(
    req: AddBookRequestDto,
    auth: AuthRequestDto,
  ): Promise<SuccessResponseDto> {
    try {
      await AddBookValidation.validateAsync(req);
    } catch (err) {
      throwApiError(
        CustomExceptionCode.BAD_REQUEST,
        ApiErrorEnum.api_error_invalid_input_data,
      );
    }
    const authorCheck = await this.authorModel.findOne({
      _id: req.authorID,
      UserID: auth.user.id,
      IsDeleted: false,
    });
    if (!authorCheck) {
      throwApiError(
        CustomExceptionCode.API_ERROR,
        ApiErrorEnum.api_error_author_not_found,
      );
    }

    const mapCategory = req.categoryID.map((item) => item.toString());
    const categoryCheck = await this.categoryModel.find({
      _id: { $in: mapCategory },
      UserID: auth.user.id,
      IsDeleted: false,
    });
    if (!categoryCheck || categoryCheck.length === 0) {
      throwApiError(
        CustomExceptionCode.API_ERROR,
        ApiErrorEnum.api_error_category_not_found,
      );
    }
    const bookCheck = await this.bookModel.findOne({
      BookName: req.bookName,
      UserID: auth.user.id,
      IsDeleted: false,
    });
    if (bookCheck) {
      throwApiError(
        CustomExceptionCode.API_ERROR,
        ApiErrorEnum.api_error_book_already_exists,
      );
    }
    await this.bookModel.create({
      BookName: req.bookName,
      Price: req.price,
      UserID: auth.user.id,
      AuthorID: req.authorID,
      CategoryID: req.categoryID,
    });
    return Promise.resolve({ status: true });
  }

  async deleteBook(
    req: DeleteBookRequestDto,
    auth: AuthRequestDto,
  ): Promise<SuccessResponseDto> {
    try {
      await DeleteBookValidation.validateAsync(req);
    } catch (err) {
      throwApiError(
        CustomExceptionCode.BAD_REQUEST,
        ApiErrorEnum.api_error_invalid_input_data,
      );
    }
    const bookCheck = await this.bookModel.findOne({
      _id: req.bookID,
      UserID: auth.user.id,
      IsDeleted: false,
    });
    if (!bookCheck) {
      throwApiError(
        CustomExceptionCode.API_ERROR,
        ApiErrorEnum.api_error_book_not_found,
      );
    }
    await this.bookModel.updateOne({ _id: req.bookID }, { IsDeleted: true });
    return Promise.resolve({ status: true });
  }

  async updateBook(
    req: UpdateBookRequestDto,
    auth: AuthRequestDto,
  ): Promise<SuccessResponseDto> {
    const bookCheck = await this.bookModel.findOne({
      _id: req.bookID,
      UserID: auth.user.id,
      IsDeleted: false,
    });
    if (!bookCheck) {
      throwApiError(
        CustomExceptionCode.API_ERROR,
        ApiErrorEnum.api_error_book_not_found,
      );
    }
    try {
      if (req.bookName && req.bookName !== bookCheck.BookName) {
        await this.bookModel.findOne({
          BookName: req.bookName,
          UserID: auth.user.id,
          IsDeleted: false,
        });
      }
    } catch (err) {
      throwApiError(
        CustomExceptionCode.BAD_REQUEST,
        ApiErrorEnum.api_error_book_name_already_exists,
      );
    }
    if (req.categoryID && req.categoryID.length > 0) {
      const mapCategory = req.categoryID.map((item) => item.toString());
      const categoryCheck = await this.categoryModel.find({
        _id: { $in: mapCategory },
        UserID: auth.user.id,
        IsDeleted: false,
      });
      if (!categoryCheck || categoryCheck.length !== req.categoryID.length) {
        throwApiError(
          CustomExceptionCode.API_ERROR,
          ApiErrorEnum.api_error_category_not_found,
        );
      }
    }
    if (req.authorID) {
      const authorCheck = await this.authorModel.findOne({
        _id: req.authorID,
        UserID: auth.user.id,
        IsDeleted: false,
      });
      if (!authorCheck) {
        throwApiError(
          CustomExceptionCode.API_ERROR,
          ApiErrorEnum.api_error_author_not_found,
        );
      }
    }
    const updateOptions = {
      _id: req.bookID,
      BookName: req.bookName ?? bookCheck.BookName,
      Price: req.price ?? bookCheck.Price,
      AuthorID: req.authorID ?? bookCheck.AuthorID,
      CategoryID: req.categoryID ?? bookCheck.CategoryID,
    };
    const updateResult = await this.bookModel.updateOne(updateOptions);
    if (updateResult.modifiedCount === 0) {
      throwApiError(
        CustomExceptionCode.API_ERROR,
        ApiErrorEnum.api_error_update_book_failed,
      );
    }
    return Promise.resolve({ status: true });
  }
}
