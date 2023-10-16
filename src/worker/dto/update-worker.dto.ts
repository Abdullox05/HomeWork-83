import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkerDto } from './create-worker.dto';

export class UpdateWorkerDto extends PartialType(CreateWorkerDto) {
  name?: string;
  age?: number;
  experience?: number;
  phone?: string;
  username?: string;
  description?: string;
}
