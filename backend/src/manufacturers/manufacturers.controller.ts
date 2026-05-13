import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
import { ManufacturersService } from './manufacturers.service';

@Controller('manufacturers')
export class ManufacturersController {
  constructor(private manufacturersService: ManufacturersService) {}

  @Get()
  findAll() {
    return this.manufacturersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.manufacturersService.findById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  create(@Body() dto: CreateManufacturerDto) {
    return this.manufacturersService.create(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateManufacturerDto) {
    return this.manufacturersService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.manufacturersService.remove(id);
    return { message: 'Производитель удалён' };
  }
}
