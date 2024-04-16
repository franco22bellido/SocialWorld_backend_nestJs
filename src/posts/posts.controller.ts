import { Controller, Get } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {

    constructor(
        private readonly _postService: PostsService
    ){}

    
    @Get('/most-popular')
    async mostPopular(){
        return await this._postService.findTheMostsPopular();
    }
}