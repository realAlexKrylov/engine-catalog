import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateEngineDto } from './dto/create-engine.dto';
import { UpdateEngineDto } from './dto/update-engine.dto';
import { EnginesService } from './engines.service';

@Controller('engines')
export class EnginesController {
  constructor(private enginesService: EnginesService) {}

  @Get()
  findAll(@Query('categoryId') categoryId?: string, @Query('manufacturerId') manufacturerId?: string) {
    return this.enginesService.findAll(categoryId, manufacturerId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enginesService.findById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  create(@Body() dto: CreateEngineDto) {
    return this.enginesService.create(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEngineDto) {
    return this.enginesService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.enginesService.remove(id);
    return { message: 'Двигатель удалён' };
  }
}
