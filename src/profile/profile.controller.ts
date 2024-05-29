import { Body, Controller, Patch, Req, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update.profile.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RequestUser } from '../common/request.user';

@Controller('profile')
@UseGuards(AuthGuard)
export class ProfileController {
  constructor(private readonly _profileService: ProfileService) {}

  @Patch()
  updateProfile(
    @Body() profileDto: UpdateProfileDto,
    @Req() { user }: RequestUser,
  ) {
    return this._profileService.updateProfile(user.id, profileDto);
  }
}
