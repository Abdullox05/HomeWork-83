import mongoose from "mongoose";

export class CreateWorkersVaccinationDto {
  worker: mongoose.Schema.Types.ObjectId;
  vaccination_history: mongoose.Schema.Types.ObjectId;
}
