import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private _userRepository: UserRepository) {}

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
