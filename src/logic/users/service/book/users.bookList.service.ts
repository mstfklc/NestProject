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

  async showBookDetail(bookID: string): Promise<ShowBookDetailResponseDto> {
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
}
