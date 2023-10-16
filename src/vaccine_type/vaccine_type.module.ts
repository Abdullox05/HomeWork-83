import { Module } from '@nestjs/common';
import { VaccineTypeService } from './vaccine_type.service';
import { VaccineTypeController } from './vaccine_type.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VaccineType, VaccineTypeSchema } from './schemas/vaccine_type.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: VaccineType.name, schema: VaccineTypeSchema}])
  ],
  controllers: [VaccineTypeController],
  providers: [VaccineTypeService],
})
export class VaccineTypeModule {}
