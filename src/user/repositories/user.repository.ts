import { UserEntity } from '../entities/user.entity';
import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private _dataSource: DataSource) {
    super(UserEntity, _dataSource.createEntityManager());
  }
  async findByUsername(username: string) {
    const userByUsername = await this.findOne({ where: { username } });
    return userByUsername;
  }
  async findByUsernameAndSelectPassword(username: string) {
    const userByUsername = await this.findOne({
      where: { username },
      select: { password: true, id: true, username: true },
    });
    return userByUsername;
  }
  async findByEmail(email: string) {
    return await this.findOne({ where: { email } });
  }
  async findOneByUsernameOrSimilar(partialUsername: string) {
    return this.createQueryBuilder('user')
      .where('user.username like :partialUsername', {
        partialUsername: `%${partialUsername}%`,
      })
      .take(10)
      .getMany();
  }
}
