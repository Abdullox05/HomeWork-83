import { PartialType } from '@nestjs/swagger';
import { CreateVaccinationHistoryDto } from './create-vaccination_history.dto';

export class UpdateVaccinationHistoryDto extends PartialType(CreateVaccinationHistoryDto) {
  date?: string;
  next_date?: string;
  photo?: string;
}
