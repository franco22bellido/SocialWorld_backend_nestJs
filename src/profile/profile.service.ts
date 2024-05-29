import { Injectable, NotFoundException } from '@nestjs/common';
import { ProfileRepository } from './profile.repository';
import { UpdateProfileDto } from './dto/update.profile.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly _profileRepository: ProfileRepository) {}

  async getProfile(userId: number) {
    const profileFound = await this._profileRepository.findOne({
      where: { userId },
    });
    if (!profileFound) throw new NotFoundException('profile not found');
    return profileFound;
  }
  async updateProfile(userId: number, partialProfile: UpdateProfileDto) {
    const profileFound = await this._profileRepository.findOne({
      where: { userId },
    });

    const profileUpdated = {
      ...profileFound,
      ...{
        firstname: partialProfile.firstname,
        lastname: partialProfile.lastname,
        info: partialProfile.info,
      },
    };

    await this._profileRepository.save(profileUpdated);

    return {
      partialProfile,
    };
  }
}
