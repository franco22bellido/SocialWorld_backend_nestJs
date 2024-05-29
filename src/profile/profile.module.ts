import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { ProfileEntity } from './entities/profile.entity';
import { ProfileRepository } from './profile.repository';
import { ProfileController } from './profile.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([ProfileEntity, UserEntity])],
  providers: [ProfileService, ProfileRepository],
  exports: [ProfileRepository, ProfileRepository],
  controllers: [ProfileController],
})
export class ProfileModule {}
