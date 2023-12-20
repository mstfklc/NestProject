import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../../../schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { AuthLoginService } from './auth.login.service';
import { CustomExceptionCode } from '../../../../enum/customExceptionCode.enum';
import * as bcrypt from 'bcrypt';
import { Role } from '../../../../enum/role.enum';

const mockUser = {
  _id: new mongoose.Types.ObjectId(),
  FullName: 'Test User',
  Email: 'test@email.com',
  PasswordHashed: 'testhashedpassword',
  IsDeleted: false,
  Role: Role.User,
};
const token = 'jwtToken';

describe('AuthLoginService', () => {
  let authService: AuthLoginService;
  let model: Model<User>;
  let jwtService: JwtService;

  const mockAuthService = {
    findOne: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthLoginService,
        JwtService,
        {
          provide: getModelToken(User.name),
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authService = module.get<AuthLoginService>(AuthLoginService);
    model = module.get<Model<User>>(getModelToken(User.name));
    jwtService = module.get<JwtService>(JwtService);
  });

  const loginDto = {
    email: 'test@gmail.com',
    password: '12345678M',
  };
  const invalidInput = {
    email: 'test@email.com',
    password: '1234567',
  };
  it('should login and return the token', async () => {
    jest
      .spyOn(model, 'findOne')
      .mockResolvedValueOnce(Promise.resolve(loginDto));
    jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true as never);
    jest.spyOn(jwtService, 'sign').mockReturnValue(token);

    const result = await authService.login(loginDto);
    expect(result).toEqual({ token });
  });
  it('should throw api_error_invalid_input_data for invalid input', async () => {
    jest.spyOn(model, 'findOne').mockResolvedValueOnce(mockUser);
    jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true as never);

    await expect(authService.login(invalidInput)).rejects.toMatchObject({
      response: 'api_error_invalid_input_data',
      status: CustomExceptionCode.BAD_REQUEST,
    });
  });
  it('should throw api_error_user_not_found for invalid user', async () => {
    const findOneDto = {
      email: 'test@gmail.com',
      password: '12345678M',
    };
    const userNotFound = {
      email: 'test123@gmail.com',
      password: '12345678M',
    };
    model.findOne(findOneDto);
    await expect(authService.login(userNotFound)).rejects.toMatchObject({
      response: 'api_error_user_not_found',
      status: CustomExceptionCode.BAD_REQUEST,
    });
  });
});
