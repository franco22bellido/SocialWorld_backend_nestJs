import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, MinLength } from 'class-validator';
export class FindUsersDto {
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value.trim())
  @MinLength(1)
  username: string;
}
