import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Speciality } from '../../speciality/schemas/speciality.schema';
import { Block } from '../../block/schemas/block.schema';

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

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: "Block"}]})
  blocks: Block[];

  @Prop()
  description: string;
}

export const WorkerSchema = SchemaFactory.createForClass(Worker);
