import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWorkersVaccinationDto } from './dto/create-workers_vaccination.dto';
import { InjectModel } from '@nestjs/mongoose';
import { WorkersVaccination, WorkersVaccinationDocument } from './schemas/workers_vaccination.schema';
import { Model, isValidObjectId } from 'mongoose';
import { Worker, WorkerDocument } from '.././worker/schemas/worker.schema';
import { VaccinationHistory, VaccinationHistoryDocument } from '.././vaccination_history/schemas/vaccination_history.schema';

@Injectable()
export class WorkersVaccinationsService {
  constructor(
    @InjectModel(WorkersVaccination.name) private workersVaccinationModel: Model<WorkersVaccinationDocument>,
    @InjectModel(Worker.name) private workerModel: Model<WorkerDocument>,
    @InjectModel(VaccinationHistory.name) private vaccinationHistoryModel: Model<VaccinationHistoryDocument>,
  ) {}

  async create(createWorkersVaccinationDto: CreateWorkersVaccinationDto) {
    if (!isValidObjectId(createWorkersVaccinationDto.worker) || !isValidObjectId(createWorkersVaccinationDto.vaccination_history))
      throw new BadRequestException("Wrong Worker ID or Vaccination History ID");

    const worker = await this.workerModel.findById(createWorkersVaccinationDto.worker);

    if (!worker) throw new BadRequestException("Worker not found");

    const vaccinationHistory = await this.vaccinationHistoryModel.findById(createWorkersVaccinationDto.vaccination_history);

    if (!vaccinationHistory) throw new BadRequestException("Vaccination History not found");

    if (worker.id != vaccinationHistory.worker[0]) throw new BadRequestException("Wrong Worker ID");

    const workersVaccination = await this.workersVaccinationModel.create(createWorkersVaccinationDto);

    worker.vaccination_histories.push(workersVaccination.vaccination_history);

    await worker.save();

    vaccinationHistory.worker = workersVaccination.worker;

    await vaccinationHistory.save();

    return workersVaccination;
  }

  async findAll() {
    return await this.workersVaccinationModel.find().populate("worker").populate("vaccination_history");
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException("Wrong ID");

    return await this.workersVaccinationModel.findById(id).populate("worker").populate("vaccination_history");
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException("Wrong ID");

    return await this.workersVaccinationModel.findByIdAndDelete(id);
  }
}
