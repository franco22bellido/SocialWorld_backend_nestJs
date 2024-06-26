import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ProfileEntity } from './entities/profile.entity';

@Injectable()
export class ProfileRepository extends Repository<ProfileEntity> {
  constructor(_dataSource: DataSource) {
    super(ProfileEntity, _dataSource.createEntityManager());
  }
}
