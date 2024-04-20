import { Transform, TransformFnParams } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value.trim())
  @MinLength(4)
  username: string;

  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value.trim())
  @MinLength(4)
  password: string;

  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value.trim())
  firstname: string;

  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value.trim())
  lastname: string;
}
