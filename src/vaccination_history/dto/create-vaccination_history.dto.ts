import mongoose from "mongoose";

export class CreateVaccinationHistoryDto {
  animal: mongoose.Schema.Types.ObjectId;
  vaccine_type_id: mongoose.Schema.Types.ObjectId;
  date: string;
  next_date: string;
  photo: string;
  worker: mongoose.Schema.Types.ObjectId;
}
