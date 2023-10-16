import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { WorkersVaccinationsService } from './workers_vaccinations.service';
import { CreateWorkersVaccinationDto } from './dto/create-workers_vaccination.dto';

@Controller('workers-vaccinations')
export class WorkersVaccinationsController {
  constructor(private readonly workersVaccinationsService: WorkersVaccinationsService) {}

  @Post()
  create(@Body() createWorkersVaccinationDto: CreateWorkersVaccinationDto) {
    return this.workersVaccinationsService.create(createWorkersVaccinationDto);
  }

  @Get()
  findAll() {
    return this.workersVaccinationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workersVaccinationsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workersVaccinationsService.remove(id);
  }
}
