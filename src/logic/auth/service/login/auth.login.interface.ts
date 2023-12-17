import { LoginRequestDto } from '../../dto/request/login/login.request.dto';
import LoginResponseDto from '../../dto/response/login/login.response.dto';

export interface AuthLoginInterface {
  login(req: LoginRequestDto): Promise<LoginResponseDto>;
}
