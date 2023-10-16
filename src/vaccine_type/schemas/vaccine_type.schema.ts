import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { VaccinationHistory } from '../../vaccination_history/schemas/vaccination_history.schema';

export type VaccineTypeDocument = HydratedDocument<VaccineType>;

@Schema({versionKey: false})
export class VaccineType {
  @Prop({required: true})
  title: string;

  @Prop({required: true})
  description: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: "VaccinationHistory"})
  vaccination_histories: VaccinationHistory[];
}

export const VaccineTypeSchema = SchemaFactory.createForClass(VaccineType);
