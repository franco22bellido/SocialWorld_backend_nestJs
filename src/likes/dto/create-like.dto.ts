import { IsNumber, IsNotEmpty } from 'class-validator';
export class CreateLikeDto {
  @IsNotEmpty()
  @IsNumber()
  postId: number;
}
