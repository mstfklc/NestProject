import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from '../../../../schemas/category.schema';
import {
  AddCategoryRequestDto,
  AddCategoryValidation,
} from '../../dto/request/category/addCategory.request.dto';
import { SuccessResponseDto } from '../../../../dto/success.response.dto';
import { throwApiError } from '../../../../util/http.utility';
import { CustomExceptionCode } from '../../../../enum/customExceptionCode.enum';
import { ApiErrorEnum } from '../../../../enum/apiError.enum';
import { AuthRequestDto } from '../../../../custom/jwt/dto/auth.request.dto';
import { ListCategoryResponseDto } from '../../dto/response/category/listCategory.response.dto';
import {
  DeleteCategoryRequestDto,
  DeleteCategoryValidation,
} from '../../dto/request/category/deleteCategory.request.dto';
import { Book } from '../../../../schemas/book.schema';

@Injectable()
export class UsersCategoryService {
  constructor(
    @InjectModel('Book')
    private bookModel: mongoose.Model<Book>,
    @InjectModel('Category')
    private categoryModel: mongoose.Model<Category>,
  ) {}

  async addCategory(
    req: AddCategoryRequestDto,
    auth: AuthRequestDto,
  ): Promise<SuccessResponseDto> {
    try {
      await AddCategoryValidation.validateAsync(req);
    } catch (err) {
      throwApiError(
        CustomExceptionCode.BAD_REQUEST,
        ApiErrorEnum.api_error_invalid_input_data,
      );
    }
    const category = await this.categoryModel.findOne({
      CategoryName: req.categoryName,
      UserID: auth.user.id,
      IsDeleted: false,
    });
    if (category) {
      throwApiError(
        CustomExceptionCode.API_ERROR,
        ApiErrorEnum.api_error_category_already_exists,
      );
    }
    await this.categoryModel.create({
      CategoryName: req.categoryName,
      UserID: auth.user.id,
    });
    return Promise.resolve({ status: true });
  }

  async listCategories(auth: AuthRequestDto): Promise<ListCategoryResponseDto> {
    const categoryCheck = await this.categoryModel.find({
      UserID: auth.user.id,
      IsDeleted: false,
    });
    const response: ListCategoryResponseDto = {
      categories: categoryCheck.map((category) => ({
        categoryID: category._id.toString(),
        categoryName: category.CategoryName,
      })),
    };
    return Promise.resolve(response);
  }

  async deleteCategory(
    req: DeleteCategoryRequestDto,
    auth: AuthRequestDto,
  ): Promise<SuccessResponseDto> {
    try {
      await DeleteCategoryValidation.validateAsync(req);
    } catch (err) {
      throwApiError(
        CustomExceptionCode.BAD_REQUEST,
        ApiErrorEnum.api_error_invalid_input_data,
      );
    }
    const category = await this.categoryModel.findOne({
      _id: req.categoryID,
      UserID: auth.user.id,
      IsDeleted: false,
    });
    if (!category) {
      throwApiError(
        CustomExceptionCode.API_ERROR,
        ApiErrorEnum.api_error_category_not_found,
      );
    }
    const categoryRelationCheck = await this.bookModel.find({
      CategoryID: req.categoryID,
      UserID: auth.user.id,
      IsDeleted: false,
    });
    if (categoryRelationCheck.length > 0) {
      throwApiError(
        CustomExceptionCode.API_ERROR,
        ApiErrorEnum.api_error_category_has_book,
      );
    }
    await this.categoryModel.updateOne(
      { _id: req.categoryID, UserID: auth.user.id },
      { IsDeleted: true },
    );
    return Promise.resolve({ status: true });
  }
}
