import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { hash, compare } from 'bcrypt';
import { ProfileRepository } from '../profile/profile.repository';

@Injectable()
export class UserService {
  constructor(
    private _userRepository: UserRepository,
    private _profileRepository: ProfileRepository,
  ) {}

  async findByUsernameOrSimilar(username: string) {
    return this._userRepository.findOneByUsernameOrSimilar(username);
  }
  async findByUsername(username: string) {
    const userFound =
      await this._userRepository.findByUsernameWithProfileAndPosts(username);
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

    //create user
    const newUser = this._userRepository.create({
      username: userDto.username.toLowerCase(),
      email: userDto.email,
      password: userDto.password,
    });

    // create profile
    const newProfile = this._profileRepository.create({
      firstname: userDto.firstname,
      lastname: userDto.lastname,
    });
    newProfile.user = newUser;

    // saving newProfile + user
    return await this._profileRepository.save(newProfile);
  }
  async deleteOne(username: string, password: string) {
    const userFound =
      await this._userRepository.findByUsernameAndSelectPassword(username);
    if (!userFound) {
      throw new NotFoundException('user not found');
    }
    const isMatch = await compare(password, userFound.password);

    if (!isMatch) {
      throw new UnauthorizedException('the password is wrong');
    }
    const result = await this._userRepository.delete(userFound.id);
    return { message: 'user deleted', result };
  }
}
