import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private _userRepository: UserRepository) {}

  async findOneByUsernameOrSimilar(username) {
    return this._userRepository.find({ where: { username }, take: 10 });
  }
  async findByUsername(username) {
    const userFound = await this._userRepository.findByUsername(username);
    if (!userFound) {
      throw new NotFoundException('username not found');
    }
    return userFound;
  }
  async create(userDto: CreateUserDto) {
    // validate if user exist
    let userFound = await this._userRepository.findByUsername(userDto.username);

    if (userFound) {
      throw new ConflictException('username is already exist');
    }
    userFound = await this._userRepository.findByEmail(userDto.email);
    if (userFound) {
      throw new ConflictException('email is already exist');
    }

    //hash the password
    userDto.password = await hash(userDto.password, 10);
    //save user
    const newUser = this._userRepository.create(userDto);
    return this._userRepository.save(newUser);
  }
}
