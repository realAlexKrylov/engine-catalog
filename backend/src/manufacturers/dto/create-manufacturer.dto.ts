import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateManufacturerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsInt()
  @Min(1800)
  foundedYear: number;

  @IsNotEmpty()
  @IsString()
  description: string;
}
