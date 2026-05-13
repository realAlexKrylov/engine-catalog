import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { StorageService } from '../storage/storage.service';
import { CreateReviewDto } from './dto/create-review.dto';

export interface Review {
  id: string;
  engineId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

@Injectable()
export class ReviewsService {
  constructor(private storage: StorageService) {}

  findAll(engineId?: string): Review[] {
    const reviews = this.storage.readAll<Review>('reviews');
    if (engineId) return reviews.filter((r) => r.engineId === engineId);
    return reviews;
  }

  findById(id: string): Review {
    const review = this.storage.findById<Review>('reviews', id);
    if (!review) throw new NotFoundException('Отзыв не найден');
    return review;
  }

  create(dto: CreateReviewDto, userId: string): Review {
    const review: Review = {
      id: uuidv4(),
      engineId: dto.engineId,
      userId,
      rating: dto.rating,
      comment: dto.comment,
      createdAt: new Date().toISOString(),
    };
    return this.storage.create('reviews', review);
  }

  remove(id: string, userId: string, role: string): void {
    const review = this.storage.findById<Review>('reviews', id);
    if (!review) throw new NotFoundException('Отзыв не найден');
    if (role !== 'admin' && review.userId !== userId) {
      throw new NotFoundException('Отзыв не найден');
    }
    this.storage.delete('reviews', id);
  }
}
