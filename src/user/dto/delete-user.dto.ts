import { IsNotEmpty, MinLength } from 'class-validator';
export class UserDeleteDto {
  @IsNotEmpty()
  @MinLength(4)
  password: string;
}
