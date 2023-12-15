import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common/decorators';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(
        private readonly _userService: UserService
    ){}
    
    @Get("/get-followers")
    async getFollowers(){
        return this._userService.getFollowers();
    }


}
