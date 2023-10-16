import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Animal } from '../../animal/schemas/animal.schema';
import { VaccinationHistory } from '../../vaccination_history/schemas/vaccination_history.schema';

export type AnimalsVaccinationDocument = HydratedDocument<AnimalsVaccination>;

@Schema({versionKey: false})
export class AnimalsVaccination {
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Animal"})
  animal: Animal;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: "VaccinationHistory"})
  vaccination_history: VaccinationHistory;
}

export const AnimalsVaccinationSchema = SchemaFactory.createForClass(AnimalsVaccination);
