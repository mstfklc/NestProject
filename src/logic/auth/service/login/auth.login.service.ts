import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { throwApiError } from '../../../../util/http.utility';
import { ApiErrorEnum } from '../../../../enum/apiError.enum';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../../../schemas/user.schema';
import mongoose from 'mongoose';
import {
  AuthLoginValidation,
  LoginRequestDto,
} from '../../dto/request/login/login.request.dto';
import LoginResponseDto from '../../dto/response/login/login.response.dto';
import * as bcrypt from 'bcrypt';
import { CustomExceptionCode } from '../../../../enum/customExceptionCode.enum';
import { AuthLoginInterface } from './auth.login.interface';

@Injectable()
export class AuthLoginService implements AuthLoginInterface {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private jwtService: JwtService,
  ) {}

  async login(req: LoginRequestDto): Promise<LoginResponseDto> {
    try {
      await AuthLoginValidation.validateAsync(req);
    } catch (err) {
      throwApiError(
        CustomExceptionCode.BAD_REQUEST,
        ApiErrorEnum.api_error_invalid_input_data,
      );
    }
    const user = await this.userModel.findOne({
      Email: req.email,
      IsDeleted: false,
    });
    if (!user) {
      throwApiError(
        CustomExceptionCode.API_ERROR,
        ApiErrorEnum.api_error_user_not_found,
      );
    }
    const isPasswordMatch = await bcrypt.compare(
      req.password,
      user.PasswordHashed,
    );
    if (!isPasswordMatch) {
      throwApiError(
        CustomExceptionCode.API_ERROR,
        ApiErrorEnum.api_error_credential_invalid,
      );
    }
    const token = this.jwtService.sign({
      id: user._id,
      fullName: user.FullName,
    });

    return new LoginResponseDto(token);
  }

  /*async adminLogin(req: LoginRequestDto): Promise<LoginResponseDto> {
      const admin = await this.userModel.findOne({
        Email: req.email,
        IsDeleted: false,
        Roles: Role.Admin,
      });
      if (!admin) {
        throwApiError(
          CustomExceptionCode.API_ERROR,
          ApiErrorEnum.api_error_credential_invalid,
        );
      }
      const isPasswordMatch = await bcrypt.compare(
        req.password,
        admin.PasswordHashed,
      );
      if (!isPasswordMatch) {
        throwApiError(
          CustomExceptionCode.API_ERROR,
          ApiErrorEnum.api_error_credential_invalid,
        );
      }
      const accessToken = this.jwtService.sign({
        id: admin._id,
        fullName: admin.FullName,
        roles: admin.Roles,
      });
      return new LoginResponseDto(accessToken);
    }*/
}
