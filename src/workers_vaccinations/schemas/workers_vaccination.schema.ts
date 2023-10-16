import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Worker } from '../../worker/schemas/worker.schema';
import { VaccinationHistory } from '../../vaccination_history/schemas/vaccination_history.schema';

export type WorkersVaccinationDocument = HydratedDocument<WorkersVaccination>;

@Schema({versionKey: false})
export class WorkersVaccination {
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Worker"})
  worker: Worker;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: "VaccinationHistory"})
  vaccination_history: VaccinationHistory;
}

export const WorkersVaccinationSchema = SchemaFactory.createForClass(WorkersVaccination);
