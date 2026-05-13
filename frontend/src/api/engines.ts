import { Engine } from '../types';
import client from './client';

export const enginesApi = {
  getAll: (params?: { categoryId?: string; manufacturerId?: string }) =>
    client.get<Engine[]>('/engines', { params }).then((r) => r.data),

  getById: (id: string) =>
    client.get<Engine>(`/engines/${id}`).then((r) => r.data),

  create: (data: Omit<Engine, 'id'>) =>
    client.post<Engine>('/engines', data).then((r) => r.data),

  update: (id: string, data: Partial<Omit<Engine, 'id'>>) =>
    client.put<Engine>(`/engines/${id}`, data).then((r) => r.data),

  remove: (id: string) =>
    client.delete(`/engines/${id}`).then((r) => r.data),
};
