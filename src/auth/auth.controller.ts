import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/user-login.dto';
import { AuthGuard } from './auth.guard';
import { RequestUser } from '../common/request.user';
import { Response } from 'express';

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
  async loginUser(@Body() userLoginDto: LoginDto, @Res() response: Response) {
    const data = await this._authService.loginUser(userLoginDto);
    const Bearer = `Bearer ${data.token}`;
    response.cookie('authorization', Bearer, {
      secure: true,
      sameSite: 'none',
      maxAge: 60 * 60 * 24 * 7,
    });
    return response.status(200).json({ message: 'login sussefull' });
  }
  @UseGuards(AuthGuard)
  @Get('/profile')
  getProfile(@Req() requestUser: RequestUser) {
    return { message: 'it is your profile!', user: requestUser.user };
  }
}
