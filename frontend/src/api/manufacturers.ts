import { Manufacturer } from '../types';
import client from './client';

export const manufacturersApi = {
  getAll: () => client.get<Manufacturer[]>('/manufacturers').then((r) => r.data),
  getById: (id: string) => client.get<Manufacturer>(`/manufacturers/${id}`).then((r) => r.data),
  create: (data: Omit<Manufacturer, 'id'>) => client.post<Manufacturer>('/manufacturers', data).then((r) => r.data),
  update: (id: string, data: Partial<Omit<Manufacturer, 'id'>>) => client.put<Manufacturer>(`/manufacturers/${id}`, data).then((r) => r.data),
  remove: (id: string) => client.delete(`/manufacturers/${id}`).then((r) => r.data),
};
