import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { StorageService } from '../storage/storage.service';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';

export interface Manufacturer {
  id: string;
  name: string;
  country: string;
  foundedYear: number;
  description: string;
}

@Injectable()
export class ManufacturersService {
  constructor(private storage: StorageService) {}

  findAll(): Manufacturer[] {
    return this.storage.readAll<Manufacturer>('manufacturers');
  }

  findById(id: string): Manufacturer {
    const item = this.storage.findById<Manufacturer>('manufacturers', id);
    if (!item) throw new NotFoundException('Производитель не найден');
    return item;
  }

  create(dto: CreateManufacturerDto): Manufacturer {
    const item: Manufacturer = { id: uuidv4(), ...dto };
    return this.storage.create('manufacturers', item);
  }

  update(id: string, dto: UpdateManufacturerDto): Manufacturer {
    const updated = this.storage.update<Manufacturer>('manufacturers', id, dto);
    if (!updated) throw new NotFoundException('Производитель не найден');
    return updated;
  }

  remove(id: string): void {
    const deleted = this.storage.delete('manufacturers', id);
    if (!deleted) throw new NotFoundException('Производитель не найден');
  }
}
