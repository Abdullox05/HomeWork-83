import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { SpecialityModule } from './speciality/speciality.module';
import { WorkerModule } from './worker/worker.module';
import { BlockModule } from './block/block.module';
import { WorkersBlocksModule } from './workers_blocks/workers_blocks.module';
import { AnimalTypeModule } from './animal_type/animal_type.module';
import { AnimalModule } from './animal/animal.module';
import { VaccineTypeModule } from './vaccine_type/vaccine_type.module';
import { VaccinationHistoryModule } from './vaccination_history/vaccination_history.module';
import { WorkersVaccinationsModule } from './workers_vaccinations/workers_vaccinations.module';
import { AnimalsVaccinationsModule } from './animals_vaccinations/animals_vaccinations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    AdminModule,
    SpecialityModule,
    WorkerModule,
    BlockModule,
    WorkersBlocksModule,
    AnimalTypeModule,
    AnimalModule,
    VaccineTypeModule,
    VaccinationHistoryModule,
    WorkersVaccinationsModule,
    AnimalsVaccinationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
