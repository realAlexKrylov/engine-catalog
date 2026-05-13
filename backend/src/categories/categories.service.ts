import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { StorageService } from '../storage/storage.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

export interface Category {
  id: string;
  name: string;
  description: string;
}

@Injectable()
export class CategoriesService {
  constructor(private storage: StorageService) {}

  findAll(): Category[] {
    return this.storage.readAll<Category>('categories');
  }

  findById(id: string): Category {
    const item = this.storage.findById<Category>('categories', id);
    if (!item) throw new NotFoundException('Категория не найдена');
    return item;
  }

  create(dto: CreateCategoryDto): Category {
    const item: Category = { id: uuidv4(), ...dto };
    return this.storage.create('categories', item);
  }

  update(id: string, dto: UpdateCategoryDto): Category {
    const updated = this.storage.update<Category>('categories', id, dto);
    if (!updated) throw new NotFoundException('Категория не найдена');
    return updated;
  }

  remove(id: string): void {
    const deleted = this.storage.delete('categories', id);
    if (!deleted) throw new NotFoundException('Категория не найдена');
  }
}
