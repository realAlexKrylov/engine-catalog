export interface Engine {
  id: string;
  name: string;
  manufacturerId: string;
  categoryId: string;
  displacement: number;
  power: number;
  torque: number;
  cylinders: number;
  fuelType: string;
  year: number;
  description: string;
  price: number;
}

export interface Manufacturer {
  id: string;
  name: string;
  country: string;
  foundedYear: number;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface Review {
  id: string;
  engineId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  age?: number;
  role: 'admin' | 'user';
}

export interface AuthResponse {
  access_token: string;
  user: User;
}
