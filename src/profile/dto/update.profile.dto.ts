import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  firstname: string;
  @IsOptional()
  @IsString()
  @MaxLength(100)
  lastname: string;
  @IsOptional()
  @IsString()
  @MaxLength(150)
  info: string;
}
