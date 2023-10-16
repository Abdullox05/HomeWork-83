import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { AnimalsVaccinationsService } from './animals_vaccinations.service';
import { CreateAnimalsVaccinationDto } from './dto/create-animals_vaccination.dto';

@Controller('animals-vaccinations')
export class AnimalsVaccinationsController {
  constructor(private readonly animalsVaccinationsService: AnimalsVaccinationsService) {}

  @Post()
  create(@Body() createAnimalsVaccinationDto: CreateAnimalsVaccinationDto) {
    return this.animalsVaccinationsService.create(createAnimalsVaccinationDto);
  }

  @Get()
  findAll() {
    return this.animalsVaccinationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.animalsVaccinationsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.animalsVaccinationsService.remove(id);
  }
}
