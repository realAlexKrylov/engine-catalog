import { Body, Controller, Delete, Get, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @Get()
  findAll(@Query('engineId') engineId?: string) {
    return this.reviewsService.findAll(engineId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewsService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateReviewDto, @Request() req: any) {
    return this.reviewsService.create(dto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: any) {
    this.reviewsService.remove(id, req.user.id, req.user.role);
    return { message: 'Отзыв удалён' };
  }
}
