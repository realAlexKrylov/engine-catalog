import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class UpdateManufacturerDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsString() country?: string;
  @IsOptional() @IsInt() @Min(1800) foundedYear?: number;
  @IsOptional() @IsString() description?: string;
}
