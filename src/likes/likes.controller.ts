import { Controller, Get } from '@nestjs/common';
import { LikesService } from './likes.service';

@Controller('likes')
export class LikesController {
    constructor(
        private readonly _likesService: LikesService
    ){}

    @Get('/')
    getMostPopular(){
        return this._likesService.findTheMostPopularPosts();
    }

}