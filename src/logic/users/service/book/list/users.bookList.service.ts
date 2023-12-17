import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from '../../../../../schemas/book.schema';
import mongoose, { Types } from 'mongoose';
import { ShowBookDetailResponseDto } from '../../../dto/response/book/showBookDetail.response.dto';
import { throwApiError } from '../../../../../util/http.utility';
import { CustomExceptionCode } from '../../../../../enum/customExceptionCode.enum';
import { ApiErrorEnum } from '../../../../../enum/apiError.enum';
import { Author } from '../../../../../schemas/author.schema';
import { Category } from '../../../../../schemas/category.schema';
import { ListBookResponseDto } from '../../../dto/response/book/listBook.response.dto';
import { AuthRequestDto } from '../../../../../custom/jwt/dto/auth.request.dto';
import { UsersBookListInterface } from './interface/users.bookList.interface';

@Injectable()
export class UsersBookListService implements UsersBookListInterface {
  constructor(
    @InjectModel('Book')
    private bookModel: mongoose.Model<Book>,
    @InjectModel('Author')
    private authorModel: mongoose.Model<Author>,
    @InjectModel('Category')
    private categoryModel: mongoose.Model<Category>,
  ) {}

  async showBookDetail(
    auth: AuthRequestDto,
    bookID: string,
  ): Promise<ShowBookDetailResponseDto> {
    const validObjectId = Types.ObjectId.isValid(bookID);
    if (!validObjectId) {
      throwApiError(
        CustomExceptionCode.API_ERROR,
        ApiErrorEnum.api_error_invalid_object_id,
      );
    }
    const book = await this.bookModel
      .findOne({
        _id: bookID,
        IsDeleted: false,
        UserID: auth.user.id,
      })
      .populate('AuthorID', 'AuthorName')
      .populate('CategoryID', 'CategoryName');

    if (!book) {
      throwApiError(
        CustomExceptionCode.API_ERROR,
        ApiErrorEnum.api_error_book_not_found,
      );
    }
    const response: ShowBookDetailResponseDto = {
      bookName: book.BookName,
      price: book.Price,
      authorName: book.AuthorID.AuthorName,
      bookCategoryName: book.CategoryID.map(
        (category) => category.CategoryName,
      ),
    };
    return Promise.resolve(response);
  }

  async listBook(
    auth: AuthRequestDto,
    authorName?: string,
    categoryName?: string,
  ): Promise<ListBookResponseDto[]> {
    const query: any = {};

    const addAuthorToQuery = async (name: string) => {
      const author = await this.authorModel.findOne({
        AuthorName: name,
        IsDeleted: false,
        UserID: auth.user.id,
      });
      if (!author) {
        throwApiError(
          CustomExceptionCode.API_ERROR,
          ApiErrorEnum.api_error_author_not_found,
        );
      }
      query.AuthorID = author._id;
    };

    const addCategoryToQuery = async (name: string) => {
      const category = await this.categoryModel.findOne({
        CategoryName: name,
        IsDeleted: false,
        UserID: auth.user.id,
      });
      if (!category) {
        throwApiError(
          CustomExceptionCode.API_ERROR,
          ApiErrorEnum.api_error_category_not_found,
        );
      }
      query.CategoryID = category._id;
    };

    if (authorName) {
      await addAuthorToQuery(authorName);
    }

    if (categoryName) {
      await addCategoryToQuery(categoryName);
    }

    const bookList = await this.bookModel
      .find(query)
      .populate('AuthorID', 'AuthorName')
      .populate('CategoryID', 'CategoryName');

    return bookList.map((book) => ({
      bookID: book._id.toString(),
      bookName: book.BookName,
      price: book.Price,
      author: { AuthorName: book.AuthorID?.AuthorName },
      categories: book.CategoryID?.map((category) => ({
        CategoryName: category.CategoryName,
      })),
    }));
  }
}
