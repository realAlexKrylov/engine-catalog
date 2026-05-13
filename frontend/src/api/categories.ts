import { Category } from '../types';
import client from './client';

export const categoriesApi = {
  getAll: () => client.get<Category[]>('/categories').then((r) => r.data),
  getById: (id: string) => client.get<Category>(`/categories/${id}`).then((r) => r.data),
  create: (data: Omit<Category, 'id'>) => client.post<Category>('/categories', data).then((r) => r.data),
  update: (id: string, data: Partial<Omit<Category, 'id'>>) => client.put<Category>(`/categories/${id}`, data).then((r) => r.data),
  remove: (id: string) => client.delete(`/categories/${id}`).then((r) => r.data),
};
