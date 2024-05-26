import {
  Body,
  Controller,
  Delete,
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
import { ConfigService } from '@nestjs/config';
import { KeysEnum } from 'src/common/keys.enum';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly _userService: UserService,
    private readonly _authService: AuthService,
    private readonly _configService: ConfigService,
  ) {}

  @Post('/register')
  registerUser(@Body() userDto: CreateUserDto) {
    return this._userService.create(userDto);
  }
  @Post('/login')
  async loginUser(
    @Body() userLoginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const data = await this._authService.loginUser(userLoginDto);
    const Bearer = `Bearer ${data.token}`;
    response.cookie(
      this._configService.get<string>(KeysEnum.COOKIE_NAME),
      Bearer,
      {
        sameSite: 'none',
        secure: true,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      },
    );
    return response.status(200).json({ message: 'login ok', user: data.user });
  }
  @UseGuards(AuthGuard)
  @Get('/profile')
  getProfile(@Req() requestUser: RequestUser) {
    return { message: 'it is your profile!', user: requestUser.user };
  }
  @UseGuards(AuthGuard)
  @Delete('/logout')
  logout(@Res() response: Response) {
    response.clearCookie(this._configService.get<string>(KeysEnum.COOKIE_NAME));
    response.status(204);
  }
}
