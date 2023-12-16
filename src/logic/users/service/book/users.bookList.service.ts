import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from '../../../../schemas/book.schema';
import mongoose, { Types } from 'mongoose';
import { ShowBookDetailResponseDto } from '../../dto/response/book/showBookDetail.response.dto';
import { throwApiError } from '../../../../util/http.utility';
import { CustomExceptionCode } from '../../../../enum/customExceptionCode.enum';
import { ApiErrorEnum } from '../../../../enum/apiError.enum';
import { Author } from '../../../../schemas/author.schema';
import { Category } from '../../../../schemas/category.schema';
import { ListBookResponseDto } from '../../dto/response/book/listBook.response.dto';
import { AuthRequestDto } from '../../../../custom/jwt/dto/auth.request.dto';

@Injectable()
export class UsersBookListService {
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
    const book = await this.bookModel.findOne({
      _id: bookID,
      IsDeleted: false,
      UserID: auth.user.id,
    });
    if (!book) {
      throwApiError(
        CustomExceptionCode.API_ERROR,
        ApiErrorEnum.api_error_book_not_found,
      );
    }
    const author = await this.authorModel.findOne({
      _id: book.AuthorID,
      IsDeleted: false,
    });
    const categoryIDs = book.CategoryID.map((category) => category.toString());

    const categoryNames = await this.categoryModel.find({
      _id: { $in: categoryIDs },
      IsDeleted: false,
    });
    const categoryNamesMap = categoryNames.map(
      (category) => category.CategoryName,
    );

    const response: ShowBookDetailResponseDto = {
      bookName: book.BookName,
      price: book.Price,
      authorName: author.AuthorName,
      bookCategoryName: categoryNamesMap,
    };
    return Promise.resolve(response);
  }

  async listBook(
    auth: AuthRequestDto,
    authorName?: string,
    categoryName?: string,
  ): Promise<ListBookResponseDto[]> {
    const query: any = {};
    if (authorName) {
      const author = await this.authorModel.findOne({
        AuthorName: authorName,
        IsDeleted: false,
        UserID: auth.user.id,
      });
      console.log(author);
      if (author) {
        query.AuthorID = author._id;
      } else {
        throwApiError(
          CustomExceptionCode.API_ERROR,
          ApiErrorEnum.api_error_author_not_found,
        );
      }
    }

    if (categoryName) {
      const category = await this.categoryModel.findOne({
        CategoryName: categoryName,
        IsDeleted: false,
        UserID: auth.user.id,
      });
      if (category) {
        query.CategoryID = category._id;
      } else {
        throwApiError(
          CustomExceptionCode.API_ERROR,
          ApiErrorEnum.api_error_category_not_found,
        );
      }
    }

    const bookList = await this.bookModel
      .find(query)
      .populate('AuthorID', 'AuthorName')
      .populate('CategoryID', 'CategoryName');

    return bookList.map((book) => ({
      bookName: book.BookName,
      price: book.Price,
      author: { AuthorName: book.AuthorID?.AuthorName },
      categories: book.CategoryID?.map((category) => ({
        CategoryName: category.CategoryName,
      })),
    }));
  }
}
