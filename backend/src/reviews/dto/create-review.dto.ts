import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsString()
  engineId: string;

  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsNotEmpty()
  @IsString()
  comment: string;
}
