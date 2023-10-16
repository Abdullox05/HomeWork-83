import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateVaccinationHistoryDto } from './dto/create-vaccination_history.dto';
import { UpdateVaccinationHistoryDto } from './dto/update-vaccination_history.dto';
import { InjectModel } from '@nestjs/mongoose';
import { VaccinationHistory, VaccinationHistoryDocument } from './schemas/vaccination_history.schema';
import { Model, isValidObjectId } from 'mongoose';
import { Animal, AnimalDocument } from '.././animal/schemas/animal.schema';
import { VaccineType, VaccineTypeDocument } from '.././vaccine_type/schemas/vaccine_type.schema';
import { Worker, WorkerDocument } from '.././worker/schemas/worker.schema';

@Injectable()
export class VaccinationHistoryService {
  constructor(
    @InjectModel(VaccinationHistory.name) private vaccinationHistoryModel: Model<VaccinationHistoryDocument>,
    @InjectModel(Animal.name) private animalModel: Model<AnimalDocument>,
    @InjectModel(VaccineType.name) private vaccineTypeModel: Model<VaccineTypeDocument>,
    @InjectModel(Worker.name) private workerModel: Model<WorkerDocument>,
  ) {}

  async create(createVaccinationHistoryDto: CreateVaccinationHistoryDto) {
    if (!isValidObjectId(createVaccinationHistoryDto.animal)) throw new BadRequestException("Wrong Animal ID");

    const animal = await this.animalModel.findById(createVaccinationHistoryDto.animal);

    if (!animal) throw new BadRequestException("Animal not Found");

    if (!isValidObjectId(createVaccinationHistoryDto.vaccine_type_id)) throw new BadRequestException("Wrong Vaccine Type ID");

    const vaccineType = await this.vaccineTypeModel.findById(createVaccinationHistoryDto.vaccine_type_id);

    if (!vaccineType) throw new BadRequestException("Vaccine Type not Found");

    if (!isValidObjectId(createVaccinationHistoryDto.worker)) throw new BadRequestException("Wrong Worker ID");

    const worker = await this.workerModel.findById(createVaccinationHistoryDto.worker);

    if (!worker) throw new BadRequestException("Worker not Found");

    const vaccinationHistory = await this.vaccinationHistoryModel.create(createVaccinationHistoryDto);

    animal.vaccination_histories.push(vaccinationHistory);

    await animal.save();

    worker.vaccination_histories.push(vaccinationHistory);

    await worker.save();

    return vaccinationHistory;
  }

  async findAll() {
    return await this.vaccinationHistoryModel.find()
      .populate("animal")
      .populate("vaccine_type_id")
      .populate("worker");
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException("Wrong ID");

    return await this.vaccinationHistoryModel.findById(id)
      .populate("animal")
      .populate("vaccine_type_id")
      .populate("worker");
  }

  async update(id: string, updateVaccinationHistoryDto: UpdateVaccinationHistoryDto) {
    if (!isValidObjectId(id)) throw new BadRequestException("Wrong ID");

    return await this.vaccinationHistoryModel.findByIdAndUpdate(id, updateVaccinationHistoryDto, {new: true});
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException("Wrong ID");

    return await this.vaccinationHistoryModel.findByIdAndDelete(id);
  }
}
