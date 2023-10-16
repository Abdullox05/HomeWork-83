import { Module } from '@nestjs/common';
import { VaccinationHistoryService } from './vaccination_history.service';
import { VaccinationHistoryController } from './vaccination_history.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VaccinationHistory, VaccinationHistorySchema } from './schemas/vaccination_history.schema';
import { Animal, AnimalSchema } from '.././animal/schemas/animal.schema';
import { VaccineType, VaccineTypeSchema } from '.././vaccine_type/schemas/vaccine_type.schema';
import { Worker, WorkerSchema } from '.././worker/schemas/worker.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: VaccinationHistory.name, schema: VaccinationHistorySchema},
      {name: Animal.name, schema: AnimalSchema},
      {name: VaccineType.name, schema: VaccineTypeSchema},
      {name: Worker.name, schema: WorkerSchema},
    ]),
  ],
  controllers: [VaccinationHistoryController],
  providers: [VaccinationHistoryService],
})
export class VaccinationHistoryModule {}
