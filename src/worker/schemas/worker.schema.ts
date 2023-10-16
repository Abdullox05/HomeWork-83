import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Speciality } from '../../speciality/schemas/speciality.schema';
import { Block } from '../../block/schemas/block.schema';
import { VaccinationHistory } from '../../vaccination_history/schemas/vaccination_history.schema';
//import { RecordOfIllness } from '../../record_of_illness/schemas/record_of_illness.schema';

export type WorkerDocument = HydratedDocument<Worker>;

@Schema({versionKey: false})
export class Worker {
  @Prop({required: true})
  name: string;

  @Prop({required: true})
  age: number;

  @Prop()
  experience: number;

  @Prop({unique: true})
  phone: string;

  @Prop({unique: true})
  username: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Speciality"})
  speciality_id: Speciality;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Block"})
  blocks: Block[];

  @Prop()
  description: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: "VaccinationHistory"})
  vaccination_histories: VaccinationHistory[];

  //@Prop({type: mongoose.Schema.Types.ObjectId, ref: "RecordOfIllness"})
  //record_of_illnesses: RecordOfIllness[];
}

export const WorkerSchema = SchemaFactory.createForClass(Worker);
