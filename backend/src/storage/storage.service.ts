import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class StorageService {
  private dataDir = path.join(process.cwd(), 'data');

  private getFilePath(entity: string): string {
    return path.join(this.dataDir, `${entity}.json`);
  }

  readAll<T>(entity: string): T[] {
    const filePath = this.getFilePath(entity);
    if (!fs.existsSync(filePath)) {
      return [];
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  }

  writeAll<T>(entity: string, data: T[]): void {
    const filePath = this.getFilePath(entity);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  }

  findById<T extends { id: string }>(entity: string, id: string): T | undefined {
    const items = this.readAll<T>(entity);
    return items.find((item) => item.id === id);
  }

  create<T extends { id: string }>(entity: string, item: T): T {
    const items = this.readAll<T>(entity);
    items.push(item);
    this.writeAll(entity, items);
    return item;
  }

  update<T extends { id: string }>(entity: string, id: string, updates: Partial<T>): T | null {
    const items = this.readAll<T>(entity);
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) return null;
    items[index] = { ...items[index], ...updates };
    this.writeAll(entity, items);
    return items[index];
  }

  delete(entity: string, id: string): boolean {
    const items = this.readAll<{ id: string }>(entity);
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) return false;
    items.splice(index, 1);
    this.writeAll(entity, items);
    return true;
  }
}
