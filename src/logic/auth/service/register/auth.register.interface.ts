import { RegisterRequestDto } from '../../dto/request/register/register.request.dto';
import { SuccessResponseDto } from '../../../../dto/success.response.dto';

export interface AuthRegisterInterface {
  register(req: RegisterRequestDto): Promise<SuccessResponseDto>;
}
