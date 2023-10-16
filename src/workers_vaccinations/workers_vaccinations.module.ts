import { Module } from '@nestjs/common';
import { WorkersVaccinationsService } from './workers_vaccinations.service';
import { WorkersVaccinationsController } from './workers_vaccinations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkersVaccination, WorkersVaccinationSchema } from './schemas/workers_vaccination.schema';
import { Worker, WorkerSchema } from '.././worker/schemas/worker.schema';
import { VaccinationHistory, VaccinationHistorySchema } from '.././vaccination_history/schemas/vaccination_history.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: WorkersVaccination.name, schema: WorkersVaccinationSchema},
      {name: Worker.name, schema: WorkerSchema},
      {name: VaccinationHistory.name, schema: VaccinationHistorySchema},
    ]),
  ],
  controllers: [WorkersVaccinationsController],
  providers: [WorkersVaccinationsService],
})
export class WorkersVaccinationsModule {}
