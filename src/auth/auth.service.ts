import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/user-login.dto';
import { UserRepository } from 'src/user/repositories/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _userRepository: UserRepository,
  ) {}

  async loginUser(user: LoginDto) {
    const userFound =
      await this._userRepository.findByUsernameAndSelectPassword(user.username);
    if (!userFound) {
      throw new NotFoundException('username is wrong');
    }
    const MatchPassword = await bcrypt.compare(
      user.password,
      userFound.password,
    );
    if (!MatchPassword) {
      throw new UnauthorizedException('the password is wrong');
    }

    const payload = {
      id: userFound.id,
      username: userFound.username,
    };
    const token = this._jwtService.sign(payload);
    return {
      message: 'successful login',
      token,
      user: {
        username: userFound.username,
        email: userFound.email,
        id: userFound.id,
      },
    };
  }
}
