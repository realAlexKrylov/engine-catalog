import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateEngineDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  manufacturerId: string;

  @IsNotEmpty()
  @IsString()
  categoryId: string;

  @IsInt()
  @Min(1)
  displacement: number;

  @IsInt()
  @Min(1)
  power: number;

  @IsInt()
  @Min(1)
  torque: number;

  @IsInt()
  @Min(1)
  cylinders: number;

  @IsNotEmpty()
  @IsString()
  fuelType: string;

  @IsInt()
  @Min(1900)
  year: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;
}
