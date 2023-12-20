import { UsersBookIndexService } from './users.bookIndex.service';
import { Book } from '../../../../../schemas/book.schema';
import mongoose, { Model } from 'mongoose';
import { Author } from '../../../../../schemas/author.schema';
import { Category } from '../../../../../schemas/category.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CustomExceptionCode } from '../../../../../enum/customExceptionCode.enum';

describe('UsersBookIndexService', () => {
  let userService: UsersBookIndexService;
  let model: Model<Book>;
  let authorModel: Model<Author>;
  let categoryModel: Model<Category>;

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
  const invalidInput = {
    bookName: '123456789123456789123456789123456789123456789123456789',
    price: 100,
    authorID: mongoose.Types.ObjectId.createFromHexString(
      '5f8d3d5d3d5d3d5d3d5d3d5d',
    ),
    categoryID: [
      mongoose.Types.ObjectId.createFromHexString('5f8d3d5d3d5d3d5d3d5d3d5d'),
      mongoose.Types.ObjectId.createFromHexString('5f8d3d5d3d5d3d5d3d5d3d5d'),
    ],
  };
  const validInput = {
    bookName: 'Test Book',
    price: 100,
    authorID: mongoose.Types.ObjectId.createFromHexString(
      '5f8d3d5d3d5d3d5d3d5d3d5d',
    ),
    categoryID: [
      mongoose.Types.ObjectId.createFromHexString('5f8d3d5d3d5d3d5d3d5d3d5d'),
      mongoose.Types.ObjectId.createFromHexString('5f8d3d5d3d5d3d5d3d5d3d5d'),
    ],
  };
  const updateValid = {
    bookID: mongoose.Types.ObjectId.createFromHexString(
      '5f8d3d5d3d5d3d5d3d5d3d5d',
    ),
    bookName: 'Updated Book Name',
    price: 150,
    authorID: mongoose.Types.ObjectId.createFromHexString(
      '5f8d3d5d3d5d3d5d3d5d3d5d',
    ),
    categoryID: [
      mongoose.Types.ObjectId.createFromHexString('5f8d3d5d3d5d3d5d3d5d3d5d'),
      mongoose.Types.ObjectId.createFromHexString('5f8d3d5d3d5d3d5d3d5d3d5d'),
    ],
  };
  const updateInvalid = {
    bookID: mongoose.Types.ObjectId.createFromHexString(
      '5f8d3d5d3d5d3d5d3d5d3d5d',
    ),
    bookName: 'Updated Book Name',
  };
  const input = {
    bookID: mongoose.Types.ObjectId.createFromHexString(
      '5f8d3d5d3d5d3d5d3d5d3d5d',
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersBookIndexService,
        {
          provide: getModelToken(Book.name),
          useValue: mockUserService,
        },
        {
          provide: getModelToken(Author.name),
          useValue: mockUserService,
        },
        {
          provide: getModelToken(Category.name),
          useValue: mockUserService,
        },
      ],
    }).compile();

    userService = module.get<UsersBookIndexService>(UsersBookIndexService);
    model = module.get<Model<Book>>(getModelToken(Book.name));
    authorModel = module.get<Model<Author>>(getModelToken(Author.name));
    categoryModel = module.get<Model<Category>>(getModelToken(Category.name));
  });

  describe('addBook', () => {
    it('should throw api_error_invalid_input_data for invalid input', async () => {
      jest.spyOn(model, 'create').mockResolvedValueOnce(true as never);
      await expect(
        userService.addBook(invalidInput, auth),
      ).rejects.toMatchObject({
        response: 'api_error_invalid_input_data',
        status: CustomExceptionCode.BAD_REQUEST,
      });
    });
    it('should throw api_error_author_not_found for invalid authorID', async () => {
      jest.spyOn(authorModel, 'findOne').mockResolvedValueOnce(false as never);
      await expect(userService.addBook(validInput, auth)).rejects.toMatchObject(
        {
          response: 'api_error_author_not_found',
          status: CustomExceptionCode.BAD_REQUEST,
        },
      );
    });
    it('should throw api_error_category_not_found for invalid categoryID', async () => {
      jest.spyOn(authorModel, 'findOne').mockResolvedValueOnce({} as never);
      jest.spyOn(categoryModel, 'find').mockResolvedValueOnce([] as never);
      await expect(userService.addBook(validInput, auth)).rejects.toMatchObject(
        {
          response: 'api_error_category_not_found',
          status: CustomExceptionCode.BAD_REQUEST,
        },
      );
    });
    it('should throw api_error_book_already_exists for existing book', async () => {
      jest.spyOn(authorModel, 'findOne').mockResolvedValueOnce(true as never);
      jest.spyOn(categoryModel, 'find').mockResolvedValueOnce(true as never);
      jest.spyOn(model, 'create').mockResolvedValueOnce(true as never);
      jest.spyOn(model, 'findOne').mockResolvedValueOnce(validInput);
      await expect(userService.addBook(validInput, auth)).rejects.toMatchObject(
        {
          response: 'api_error_book_already_exists',
          status: CustomExceptionCode.BAD_REQUEST,
        },
      );
    });
    it('should add a book successfully', async () => {
      jest.spyOn(authorModel, 'findOne').mockResolvedValueOnce(true as never);
      jest.spyOn(categoryModel, 'find').mockResolvedValueOnce(true as never);
      jest.spyOn(model, 'create').mockResolvedValueOnce(true as never);
      await expect(
        userService.addBook(validInput, auth),
      ).resolves.toMatchObject({
        status: true,
      });
    });
  });
  describe('deleteBook', () => {
    it('should throw api_error_book_not_found', async () => {
      jest.spyOn(model, 'findOne').mockResolvedValueOnce(false as never);
      await expect(userService.deleteBook(input, auth)).rejects.toMatchObject({
        response: 'api_error_book_not_found',
        status: CustomExceptionCode.BAD_REQUEST,
      });
    });
    it('should delete the book successfully', async () => {
      jest
        .spyOn(model, 'findOne')
        .mockResolvedValueOnce({ UserID: auth.user.id } as never);
      jest.spyOn(model, 'updateOne').mockResolvedValueOnce(true as never);
      await expect(userService.deleteBook(input, auth)).resolves.toMatchObject({
        status: true,
      });
    });
  });
  describe('updateBook', () => {
    it('should throw api_error_book_not_found for non-existent book', async () => {
      jest.spyOn(model, 'findOne').mockResolvedValueOnce(false as never);
      await expect(
        userService.updateBook(updateInvalid, auth),
      ).rejects.toMatchObject({
        response: 'api_error_book_not_found',
        status: CustomExceptionCode.BAD_REQUEST,
      });
    });
    it('should throw api_error_book_name_already_exists for duplicate book name', async () => {
      jest.spyOn(model, 'findOne').mockResolvedValueOnce(updateValid);
      await expect(
        userService.updateBook(updateValid, auth),
      ).rejects.toMatchObject({
        response: 'api_error_book_name_already_exists',
        status: CustomExceptionCode.BAD_REQUEST,
      });
    });

    it('should throw api_error_category_not_found for invalid categoryID', async () => {
      const categoryInvalid = {
        bookID: mongoose.Types.ObjectId.createFromHexString(
          '5f8d3d5d3d5d3d5d3d5d3d5d',
        ),
        categoryID: [
          mongoose.Types.ObjectId.createFromHexString(
            '5f8d3d5d3d5d3d5d3d5d3d5d',
          ),
          mongoose.Types.ObjectId.createFromHexString(
            '5f8d3d5d3d5d3d5d3d5d3d5d',
          ),
        ],
      };
      jest.spyOn(model, 'findOne').mockResolvedValueOnce(true as never);
      jest.spyOn(categoryModel, 'find').mockResolvedValueOnce(false as never);
      await expect(
        userService.updateBook(categoryInvalid, auth),
      ).rejects.toMatchObject({
        response: 'api_error_category_not_found',
        status: CustomExceptionCode.BAD_REQUEST,
      });
    });

    it('should throw api_error_author_not_found for invalid authorID', async () => {
      const authorInvalid = {
        bookID: mongoose.Types.ObjectId.createFromHexString(
          '5f8d3d5d3d5d3d5d3d5d3d5d',
        ),
        authorID: mongoose.Types.ObjectId.createFromHexString(
          '5f8d3d5d3d5d3d5d3d5d3d5d',
        ),
      };
      jest.spyOn(model, 'findOne').mockResolvedValueOnce(true as never);
      jest.spyOn(categoryModel, 'find').mockResolvedValueOnce(true as never);
      jest.spyOn(authorModel, 'findOne').mockResolvedValueOnce(null as never);
      await expect(
        userService.updateBook(authorInvalid, auth),
      ).rejects.toMatchObject({
        response: 'api_error_author_not_found',
        status: CustomExceptionCode.BAD_REQUEST,
      });
    });

    it('should throw api_error_update_book_failed for failed update', async () => {
      jest.spyOn(model, 'findOne').mockResolvedValueOnce(true as never);
      jest.spyOn(categoryModel, 'find').mockResolvedValueOnce(true as never);
      jest.spyOn(authorModel, 'findOne').mockResolvedValueOnce(true as never);
      jest.spyOn(model, 'updateOne').mockResolvedValueOnce({
        modifiedCount: 0,
      } as never);
      await expect(userService.updateBook(input, auth)).rejects.toMatchObject({
        response: 'api_error_update_book_failed',
        status: CustomExceptionCode.BAD_REQUEST,
      });
    });
    it('should update the book successfully', async () => {
      jest.spyOn(model, 'findOne').mockResolvedValueOnce(true as never);
      jest.spyOn(categoryModel, 'find').mockResolvedValueOnce(true as never);
      jest.spyOn(authorModel, 'findOne').mockResolvedValueOnce(true as never);
      jest.spyOn(model, 'updateOne').mockResolvedValueOnce({
        modifiedCount: 1,
      } as never);
      await expect(userService.updateBook(input, auth)).resolves.toMatchObject({
        status: true,
      });
    });
  });
});
