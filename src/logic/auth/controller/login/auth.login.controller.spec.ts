import { Test, TestingModule } from '@nestjs/testing';
import { AuthLoginController } from './auth.login.controller';

describe('AuthController', () => {
  let controller: AuthLoginController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthLoginController],
    }).compile();

    controller = module.get<AuthLoginController>(AuthLoginController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
