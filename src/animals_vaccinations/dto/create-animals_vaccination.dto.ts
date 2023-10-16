import mongoose from "mongoose";

export class CreateAnimalsVaccinationDto {
  animal: mongoose.Schema.Types.ObjectId;
  vaccination_history: mongoose.Schema.Types.ObjectId;
}
