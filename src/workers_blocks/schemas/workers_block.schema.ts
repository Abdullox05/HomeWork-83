import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Worker } from '../../worker/schemas/worker.schema';
import { Block } from '../../block/schemas/block.schema';

export type WorkersBlockDocument = HydratedDocument<WorkersBlock>;

@Schema({versionKey: false})
export class WorkersBlock {
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Worker"})
  worker: Worker;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Block"})
  block: Block;
}

export const WorkersBlockSchema = SchemaFactory.createForClass(WorkersBlock);
