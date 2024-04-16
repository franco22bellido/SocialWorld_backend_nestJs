import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly _userService: UserService) {}

  @Post('/register')
  registerUser(@Body() userDto: CreateUserDto) {
    return this._userService.create(userDto);
  }
}
