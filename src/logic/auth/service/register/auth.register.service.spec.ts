import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../../../../schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { AuthRegisterService } from './auth.register.service';
import { RegisterRequestDto } from '../../dto/request/register/register.request.dto';
import { CustomExceptionCode } from '../../../../enum/customExceptionCode.enum';

describe('AuthRegisterService', () => {
  let authService: AuthRegisterService;
  let model: Model<User>;

  const mockAuthService = {
    create: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthRegisterService,
        {
          provide: getModelToken(User.name),
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authService = module.get<AuthRegisterService>(AuthRegisterService);
    model = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('register', () => {
    it('should register and return status:true ', async () => {
      const createMockUser: RegisterRequestDto = {
        email: 'test@gmail.com',
        fullName: 'Test User',
        password: '12345678M',
      };
      jest.spyOn(bcrypt, 'hash').mockResolvedValue(true as never);
      jest.spyOn(model, 'create');
      const result = await authService.register(createMockUser);

      expect(bcrypt.hash).toHaveBeenCalled();
      expect(result).toEqual({ status: true });
    });
    it('should throw api_error_invalid_input_data for invalid input', async () => {
      const invalidInput = {
        email: 'test@gmail.com',
        fullName: 'Test User',
        password: '1234567',
      };
      jest.spyOn(model, 'create').mockResolvedValueOnce(true as never);
      jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce(true as never);

      await expect(authService.register(invalidInput)).rejects.toMatchObject({
        response: 'api_error_invalid_input_data',
        status: CustomExceptionCode.BAD_REQUEST,
      });
    });
    it('should throw api_error_user_already_exist for already exist user', async () => {
      const existUser = {
        email: 'test@gmail.com',
        fullName: 'Test User',
        password: '1234567M',
      };
      jest.spyOn(model, 'findOne').mockResolvedValueOnce(existUser as never);
      jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce(true as never);
      await expect(authService.register(existUser)).rejects.toMatchObject({
        response: 'api_error_user_already_exist',
        status: CustomExceptionCode.API_ERROR,
      });
    });
  });
});
