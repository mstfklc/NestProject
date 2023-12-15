import { ApiErrorEnum } from '../enum/apiError.enum';

export function reverseErrorEnumUtility(errorCode: ApiErrorEnum) {
  const indexOf = Object.values(ApiErrorEnum).indexOf(
    errorCode as unknown as ApiErrorEnum,
  );
  return Object.keys(ApiErrorEnum)[indexOf];
}
