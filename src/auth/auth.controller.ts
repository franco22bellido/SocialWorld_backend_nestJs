import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/user-login.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly _userService: UserService,
    private readonly _authService: AuthService,
  ) {}

  @Post('/register')
  registerUser(@Body() userDto: CreateUserDto) {
    return this._userService.create(userDto);
  }
  @Post('/login')
  loginUser(@Body() userLoginDto: LoginDto) {
    return this._authService.loginUser(userLoginDto);
  }
  @UseGuards(AuthGuard)
  @Get('/profile')
  getProfile() {
    return { message: 'it is your profile!' };
  }
}
