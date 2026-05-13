import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { StorageService } from '../storage/storage.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export interface User {
  id: string;
  name: string;
  email: string;
  age?: number;
  role: 'admin' | 'user';
  password: string;
}

@Injectable()
export class UsersService {
  constructor(private storage: StorageService) {}

  findAll(): Omit<User, 'password'>[] {
    return this.storage.readAll<User>('users').map(({ password, ...rest }) => rest);
  }

  findById(id: string): Omit<User, 'password'> {
    const user = this.storage.findById<User>('users', id);
    if (!user) throw new NotFoundException('Пользователь не найден');
    const { password, ...rest } = user;
    return rest;
  }

  findByEmail(email: string): User | undefined {
    return this.storage.readAll<User>('users').find((u) => u.email === email);
  }

  async create(dto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const existing = this.findByEmail(dto.email);
    if (existing) throw new ConflictException('Пользователь с таким email уже существует');
    const hashed = await bcrypt.hash(dto.password, 10);
    const user: User = {
      id: uuidv4(),
      name: dto.name,
      email: dto.email,
      age: dto.age,
      role: 'user',
      password: hashed,
    };
    this.storage.create('users', user);
    const { password, ...rest } = user;
    return rest;
  }

  update(id: string, dto: UpdateUserDto): Omit<User, 'password'> {
    const updated = this.storage.update<User>('users', id, dto);
    if (!updated) throw new NotFoundException('Пользователь не найден');
    const { password, ...rest } = updated;
    return rest;
  }

  remove(id: string): void {
    const deleted = this.storage.delete('users', id);
    if (!deleted) throw new NotFoundException('Пользователь не найден');
  }
}
