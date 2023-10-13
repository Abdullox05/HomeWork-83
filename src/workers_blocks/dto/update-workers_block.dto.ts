import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkersBlockDto } from './create-workers_block.dto';
import mongoose from 'mongoose';

export class UpdateWorkersBlockDto extends PartialType(CreateWorkersBlockDto) {
  worker?: mongoose.Schema.Types.ObjectId;
  block?: mongoose.Schema.Types.ObjectId;
}
