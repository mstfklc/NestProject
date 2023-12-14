import { Injectable } from '@nestjs/common';
import {
  AuthRegisterValidation,
  RegisterRequestDto,
} from '../../dto/request/register/register.request.dto';
import * as bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { User } from '../../../../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { throwApiError } from '../../../../util/http.utility';
import { ApiErrorEnum } from '../../../../enum/apiError.enum';
import { SuccessResponseDto } from '../../../../dto/success.response.dto';
import { CustomExceptionCode } from '../../../../enum/customExceptionCode.enum';

@Injectable()
export class AuthRegisterService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  async register(req: RegisterRequestDto): Promise<SuccessResponseDto> {
    const user = await this.userModel.findOne({ Email: req.email });
    if (user) {
      throwApiError(
        CustomExceptionCode.API_ERROR,
        ApiErrorEnum.api_error_user_already_exist,
      );
    }
    try {
      await AuthRegisterValidation.validateAsync(req);
    } catch (err) {
      throwApiError(
        CustomExceptionCode.BAD_REQUEST,
        ApiErrorEnum.api_error_invalid_input_data,
      );
    }
    const hashedPassword = await bcrypt.hash(req.password, 10);
    await this.userModel.create({
      PasswordHashed: hashedPassword,
      FullName: req.fullName,
      Email: req.email,
    });
    return {
      status: true,
    };
  }
}
