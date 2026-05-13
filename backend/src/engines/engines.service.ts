import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { StorageService } from '../storage/storage.service';
import { CreateEngineDto } from './dto/create-engine.dto';
import { UpdateEngineDto } from './dto/update-engine.dto';

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

@Injectable()
export class EnginesService {
  constructor(private storage: StorageService) {}

  findAll(categoryId?: string, manufacturerId?: string): Engine[] {
    let engines = this.storage.readAll<Engine>('engines');
    if (categoryId) engines = engines.filter((e) => e.categoryId === categoryId);
    if (manufacturerId) engines = engines.filter((e) => e.manufacturerId === manufacturerId);
    return engines;
  }

  findById(id: string): Engine {
    const engine = this.storage.findById<Engine>('engines', id);
    if (!engine) throw new NotFoundException('Двигатель не найден');
    return engine;
  }

  create(dto: CreateEngineDto): Engine {
    const engine: Engine = { id: uuidv4(), ...dto };
    return this.storage.create('engines', engine);
  }

  update(id: string, dto: UpdateEngineDto): Engine {
    const updated = this.storage.update<Engine>('engines', id, dto);
    if (!updated) throw new NotFoundException('Двигатель не найден');
    return updated;
  }

  remove(id: string): void {
    const deleted = this.storage.delete('engines', id);
    if (!deleted) throw new NotFoundException('Двигатель не найден');
  }
}
