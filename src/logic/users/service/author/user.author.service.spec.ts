import { UsersAuthorService } from './users.author.service';
import { Author } from '../../../../schemas/author.schema';
import mongoose, { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Book } from '../../../../schemas/book.schema';
import { CustomExceptionCode } from '../../../../enum/customExceptionCode.enum';
import { DeleteAuthorRequestDto } from '../../dto/request/author/deleteAuthor.request.dto';

describe('UsersAuthorService', () => {
  let userService: UsersAuthorService;
  let model: Model<Author>;
  let bookModel: Model<Book>;

  const mockUserService = {
    create: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    updateOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersAuthorService,
        {
          provide: getModelToken(Author.name),
          useValue: mockUserService,
        },
        {
          provide: getModelToken(Book.name),
          useValue: mockUserService,
        },
      ],
    }).compile();

    userService = module.get<UsersAuthorService>(UsersAuthorService);
    model = module.get<Model<Author>>(getModelToken(Author.name));
    bookModel = module.get<Model<Book>>(getModelToken(Book.name));
  });
  describe('addAuthor', () => {
    it('should throw api_error_invalid_input_data for invalid input', async () => {
      const invalidInput = {
        authorName: '123456789123456789123456789123456789123456789123456789',
      };
      const auth = {
        user: {
          id: '123',
          fullName: 'Test User',
        },
      };
      jest.spyOn(model, 'create').mockResolvedValueOnce(true as never);
      await expect(
        userService.addAuthor(invalidInput, auth),
      ).rejects.toMatchObject({
        response: 'api_error_invalid_input_data',
        status: CustomExceptionCode.BAD_REQUEST,
      });
    });
    it('should add author and return status:true ', async () => {
      const createMockAuthor = {
        authorName: 'Test User',
      };
      const auth = {
        user: {
          id: '123',
          fullName: 'Test User',
        },
      };
      jest.spyOn(model, 'create');
      const result = await userService.addAuthor(createMockAuthor, auth);
      expect(model.create).toHaveBeenCalled();
      expect(result).toEqual({ status: true });
    });
    it('should throw api_error_author_already_exists for already exist author', async () => {
      const existAuthor = {
        authorName: 'Test User',
      };
      const auth = {
        user: {
          id: '123',
          fullName: 'Test User',
        },
      };
      jest.spyOn(model, 'findOne').mockResolvedValueOnce(existAuthor as never);
      await expect(
        userService.addAuthor(existAuthor, auth),
      ).rejects.toMatchObject({
        response: 'api_error_author_already_exists',
        status: CustomExceptionCode.BAD_REQUEST,
      });
    });
  });
  describe('listAuthors', () => {
    it('should list authors', async () => {
      const auth = {
        user: {
          id: '123',
          fullName: 'Test User',
        },
      };
      const authorCheck = [
        {
          _id: '123',
          AuthorName: 'Test User',
        },
      ];
      jest.spyOn(model, 'find').mockResolvedValueOnce(authorCheck as never);
      const result = await userService.listAuthors(auth);
      expect(result).toEqual({
        authors: [
          {
            authorID: '123',
            authorName: 'Test User',
          },
        ],
      });
    });
  });
  describe('deleteAuthor', () => {
    it('should throw api_error_author_not_found for invalid id', async () => {
      const invalidInput: DeleteAuthorRequestDto = {
        authorID: mongoose.Types.ObjectId.createFromHexString(
          '5f8d3d5d3d5d3d5d3d5d3d5d',
        ),
      };
      const auth = {
        user: {
          id: '123',
          fullName: 'Test User',
        },
      };
      jest.spyOn(model, 'updateOne').mockResolvedValueOnce(true as never);
      await expect(
        userService.deleteAuthor(invalidInput, auth),
      ).rejects.toMatchObject({
        response: 'api_error_author_not_found',
        status: CustomExceptionCode.BAD_REQUEST,
      });
    });
    it('should throw api_error_author_has_books for author has books', async () => {
      const validInput: DeleteAuthorRequestDto = {
        authorID: mongoose.Types.ObjectId.createFromHexString(
          '5f8d3d5d3d5d3d5d3d5d3d5d',
        ),
      };
      const auth = {
        user: {
          id: '123',
          fullName: 'Test User',
        },
      };
      jest.spyOn(model, 'findOne').mockResolvedValueOnce({});
      jest.spyOn(bookModel, 'findOne').mockResolvedValueOnce({});
      await expect(
        userService.deleteAuthor(validInput, auth),
      ).rejects.toMatchObject({
        response: 'api_error_author_has_books',
        status: CustomExceptionCode.BAD_REQUEST,
      });
    });
    it('should delete author', async () => {
      const validInput: DeleteAuthorRequestDto = {
        authorID: mongoose.Types.ObjectId.createFromHexString(
          '5f8d3d5d3d5d3d5d3d5d3d5d',
        ),
      };
      const auth = {
        user: {
          id: '123',
          fullName: 'Test User',
        },
      };
      jest.spyOn(model, 'findOne').mockResolvedValueOnce({});
      jest.spyOn(bookModel, 'findOne').mockResolvedValueOnce(null);
      jest.spyOn(model, 'updateOne').mockResolvedValueOnce(true as never);
      const result = await userService.deleteAuthor(validInput, auth);
      expect(result).toEqual({ status: true });
    });
  });
});
