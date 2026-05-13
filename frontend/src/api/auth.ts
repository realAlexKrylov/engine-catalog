import { AuthResponse, User } from '../types';
import client from './client';

export const authApi = {
  login: (email: string, password: string) =>
    client.post<AuthResponse>('/auth/login', { email, password }).then((r) => r.data),

  register: (name: string, email: string, password: string, age?: number) =>
    client.post<User>('/users', { name, email, password, age }).then((r) => r.data),
};
