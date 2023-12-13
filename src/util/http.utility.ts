import { HttpException } from '@nestjs/common';
import { ApiErrorEnum } from '../enum/apiError.enum';

export const throwApiError = (statusCode: number, errorCode: ApiErrorEnum) => {
  const indexOf = Object.values(ApiErrorEnum).indexOf(
    errorCode as unknown as ApiErrorEnum,
  );
  throw new HttpException(Object.keys(ApiErrorEnum)[indexOf], statusCode);
};
