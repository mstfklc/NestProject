import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { throwApiError } from '../../../../util/http.utility';
import { CustomExceptionCode } from '../../../../constant.core';
import { ApiErrorEnum } from '../../../../enum/apiError.enum';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../../../schemas/user.schema';
import mongoose from 'mongoose';
import { LoginRequest } from '../../dto/request/login/login.request';
import LoginResponse from '../../dto/response/login/login.response';
import * as bcrypt from 'bcrypt';
import { Role } from '../../../../enum/role.enum';

@Injectable()
export class AuthLoginService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private jwtService: JwtService,
  ) {}

  async login(req: LoginRequest): Promise<LoginResponse> {
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
      roles: user.Roles,
    });
    return new LoginResponse(token);
  }

  async adminLogin(req: LoginRequest): Promise<LoginResponse> {
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
    const token = this.jwtService.sign({
      id: admin._id,
      fullName: admin.FullName,
      roles: admin.Roles,
    });
    return new LoginResponse(token);
  }
}
