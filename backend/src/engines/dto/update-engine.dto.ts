import { IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdateEngineDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsString() manufacturerId?: string;
  @IsOptional() @IsString() categoryId?: string;
  @IsOptional() @IsInt() @Min(1) displacement?: number;
  @IsOptional() @IsInt() @Min(1) power?: number;
  @IsOptional() @IsInt() @Min(1) torque?: number;
  @IsOptional() @IsInt() @Min(1) cylinders?: number;
  @IsOptional() @IsString() fuelType?: string;
  @IsOptional() @IsInt() @Min(1900) year?: number;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsNumber() @Min(0) price?: number;
}
