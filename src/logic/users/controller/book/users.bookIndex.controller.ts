import { Controller } from '@nestjs/common';
import { UsersBookIndexService } from '../../service/book/users.bookIndex.service';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@ApiSecurity('access-token')
@Controller('Book')
export class UsersBookIndexController {
  constructor(private usersBookIndexService: UsersBookIndexService) {}
}
