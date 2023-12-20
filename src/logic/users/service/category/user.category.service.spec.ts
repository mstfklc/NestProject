import { UsersCategoryService } from './users.category.service';
import mongoose, { Model } from 'mongoose';
import { Category } from '../../../../schemas/category.schema';
import { Book } from '../../../../schemas/book.schema';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { CustomExceptionCode } from '../../../../enum/customExceptionCode.enum';

describe('UserCategoryService', () => {
  let usersService: UsersCategoryService;
  let categoryModel: Model<Category>;
  let bookModel: Model<Book>;

  const auth = {
    user: {
      id: '123',
      fullName: 'Test User',
    },
  };

  const mockUserService = {
    create: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    updateOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersCategoryService,
        {
          provide: getModelToken(Book.name),
          useValue: mockUserService,
        },
        {
          provide: getModelToken(Category.name),
          useValue: mockUserService,
        },
      ],
    }).compile();
    usersService = module.get<UsersCategoryService>(UsersCategoryService);
    categoryModel = module.get<Model<Category>>(getModelToken(Category.name));
    bookModel = module.get<Model<Book>>(getModelToken(Book.name));
  });
  describe('addCategory', () => {
    it('should throw api_error_invalid_input_data for invalid input', async () => {
      const req = {
        categoryName:
          'TestCategoryTestCategoryTestCategoryTestCategoryTestCategory',
      };
      jest.spyOn(categoryModel, 'create').mockResolvedValueOnce(true as never);
      await expect(usersService.addCategory(req, auth)).rejects.toMatchObject({
        response: 'api_error_invalid_input_data',
        status: CustomExceptionCode.BAD_REQUEST,
      });
    });
    it('should throw api_error_category_already_exists for already exists category', async () => {
      const req = {
        categoryName: 'TestCategory',
      };
      jest.spyOn(categoryModel, 'findOne').mockResolvedValueOnce(req);
      await expect(usersService.addCategory(req, auth)).rejects.toMatchObject({
        response: 'api_error_category_already_exists',
        status: CustomExceptionCode.API_ERROR,
      });
    });
    it('should return status true for valid input', async () => {
      const req = {
        categoryName: 'TestCategory',
      };
      jest
        .spyOn(categoryModel, 'findOne')
        .mockResolvedValueOnce(false as never);
      jest.spyOn(categoryModel, 'create').mockResolvedValueOnce(true as never);
      await expect(usersService.addCategory(req, auth)).resolves.toMatchObject({
        status: true,
      });
    });
  });
  describe('listCategories', () => {
    it('should return list of categories', async () => {
      const categoryCheck = [
        {
          _id: '123',
          CategoryName: 'TestCategory',
        },
      ];
      jest.spyOn(categoryModel, 'find').mockResolvedValueOnce(categoryCheck);
      await expect(usersService.listCategories(auth)).resolves.toMatchObject({
        categories: [
          {
            categoryID: '123',
            categoryName: 'TestCategory',
          },
        ],
      });
    });
  });
  describe('deleteCategory', () => {
    const req = {
      categoryID: mongoose.Types.ObjectId.createFromHexString(
        '5f8d3d5d3d5d3d5d3d5d3d5d',
      ),
    };
    it('should throw api_error_category_not_found for not found category', async () => {
      jest
        .spyOn(categoryModel, 'findOne')
        .mockResolvedValueOnce(false as never);
      await expect(
        usersService.deleteCategory(req, auth),
      ).rejects.toMatchObject({
        response: 'api_error_category_not_found',
        status: CustomExceptionCode.API_ERROR,
      });
    });
    it('should throw api_error_category_has_book for category has books', async () => {
      jest.spyOn(categoryModel, 'findOne').mockResolvedValueOnce({});
      jest.spyOn(bookModel, 'find').mockResolvedValueOnce([{}]);
      await expect(
        usersService.deleteCategory(req, auth),
      ).rejects.toMatchObject({
        response: 'api_error_category_has_book',
        status: CustomExceptionCode.API_ERROR,
      });
    });
    it('should delete category', async () => {
      jest.spyOn(categoryModel, 'findOne').mockResolvedValueOnce({});
      jest.spyOn(bookModel, 'find').mockResolvedValueOnce(false as never);
      jest
        .spyOn(categoryModel, 'updateOne')
        .mockResolvedValueOnce(true as never);
      const result = await usersService.deleteCategory(req, auth);
      expect(result).toEqual({ status: true });
    });
  });
});
