import { PartialType } from '@nestjs/swagger';
import { CreateVaccineTypeDto } from './create-vaccine_type.dto';

export class UpdateVaccineTypeDto extends PartialType(CreateVaccineTypeDto) {
  title?: string;
  description?: string;
}
