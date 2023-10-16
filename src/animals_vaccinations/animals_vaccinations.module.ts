import { Module } from '@nestjs/common';
import { AnimalsVaccinationsService } from './animals_vaccinations.service';
import { AnimalsVaccinationsController } from './animals_vaccinations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AnimalsVaccination, AnimalsVaccinationSchema } from './schemas/animals_vaccination.schema';
import { Animal, AnimalSchema } from '.././animal/schemas/animal.schema';
import { VaccinationHistory, VaccinationHistorySchema } from '.././vaccination_history/schemas/vaccination_history.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: AnimalsVaccination.name, schema: AnimalsVaccinationSchema},
      {name: Animal.name, schema: AnimalSchema},
      {name: VaccinationHistory.name, schema: VaccinationHistorySchema},
    ]),
  ],
  controllers: [AnimalsVaccinationsController],
  providers: [AnimalsVaccinationsService],
})
export class AnimalsVaccinationsModule {}
