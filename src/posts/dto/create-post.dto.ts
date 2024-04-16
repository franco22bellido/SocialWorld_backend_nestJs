import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  text: string;
}
