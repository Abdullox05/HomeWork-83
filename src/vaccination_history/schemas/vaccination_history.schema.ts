import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Animal } from '../../animal/schemas/animal.schema';
import { VaccineType } from '../../vaccine_type/schemas/vaccine_type.schema';
import { Worker } from '../../worker/schemas/worker.schema';

export type VaccinationHistoryDocument = HydratedDocument<VaccinationHistory>;

@Schema({versionKey: false})
export class VaccinationHistory {
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Animal"})
  animal: Animal;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: "VaccineType"})
  vaccine_type_id: VaccineType;

  @Prop({required: true})
  date: string;

  @Prop({required: true})
  next_date: string;

  @Prop({required: true})
  photo: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Worker"})
  worker: Worker;
}

export const VaccinationHistorySchema = SchemaFactory.createForClass(VaccinationHistory);
