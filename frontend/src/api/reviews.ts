import { Review } from '../types';
import client from './client';

export const reviewsApi = {
  getAll: (engineId?: string) =>
    client.get<Review[]>('/reviews', { params: engineId ? { engineId } : undefined }).then((r) => r.data),
  create: (data: { engineId: string; rating: number; comment: string }) =>
    client.post<Review>('/reviews', data).then((r) => r.data),
  remove: (id: string) => client.delete(`/reviews/${id}`).then((r) => r.data),
};
