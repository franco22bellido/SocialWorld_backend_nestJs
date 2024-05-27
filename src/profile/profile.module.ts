import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { ProfileEntity } from './entities/profile.entity';
import { ProfileRepository } from './profile.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileEntity, UserEntity])],
  providers: [ProfileService, ProfileRepository],
  controllers: [ProfileController],
  exports: [ProfileRepository, ProfileRepository],
})
export class ProfileModule {}
