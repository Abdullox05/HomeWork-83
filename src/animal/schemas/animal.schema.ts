import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { AnimalType } from '../../animal_type/schemas/animal_type.schema';
import { VaccinationHistory } from '../../vaccination_history/schemas/vaccination_history.schema';
//import { RecordOfIllness } from '../../record_of_illness/schemas/record_of_illness.schema';

export type AnimalDocument = HydratedDocument<Animal>;

@Schema({versionKey: false})
export class Animal {
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: "AnimalType"})
  animal_type_id: AnimalType;

  @Prop({required: true})
  photos: string[];

  @Prop({required: true, unique: true})
  unique_id: string;
  
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: "VaccinationHistory"})
  vaccination_histories: VaccinationHistory[];

  //@Prop(type: mongoose.Schema.Types.ObjectId, ref: "RecordOfIllness"})
  //record_of_illnesses: RecordOfIllness[];
}

export const AnimalSchema = SchemaFactory.createForClass(Animal);
