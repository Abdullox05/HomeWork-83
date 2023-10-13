import mongoose from "mongoose";

export class CreateWorkersBlockDto {
  worker: mongoose.Schema.Types.ObjectId;
  block: mongoose.Schema.Types.ObjectId;
}
