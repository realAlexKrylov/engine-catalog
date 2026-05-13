import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, Min, Max } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(120)
  age?: number;

  @IsNotEmpty()
  @IsString()
  password: string;
}
