import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(255)
  text: string;

  @IsOptional()
  @IsUrl()
  imgUrl: string;
}
