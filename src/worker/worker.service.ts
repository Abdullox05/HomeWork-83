import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Worker, WorkerDocument } from './schemas/worker.schema';
import { Model, isValidObjectId } from 'mongoose';
import { Speciality, SpecialityDocument } from '.././speciality/schemas/speciality.schema';

@Injectable()
export class WorkerService {
  constructor(
    @InjectModel(Worker.name) private workerModel: Model<WorkerDocument>,
    @InjectModel(Speciality.name) private specialityModel: Model<SpecialityDocument>,
  ) {}

  async create(createWorkerDto: CreateWorkerDto) {
    if (!isValidObjectId(createWorkerDto.speciality_id)) throw new BadRequestException("Wrong Speciality ID");

    const spec = await this.specialityModel.findById(createWorkerDto.speciality_id);

    if (!spec) throw new BadRequestException("Speciality not Found");

    const worker = await this.workerModel.create(createWorkerDto);

    spec.workers.push(worker);

    await spec.save();

    return worker;
  }

  async findAll() {
    return await this.workerModel.find().populate("speciality_id")
      .populate("blocks")
      .populate("vaccination_histories")
      .populate("record_of_illnesses");
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException("Wrong ID");

    return await this.workerModel.findById(id).populate("speciality_id")
      .populate("blocks")
      .populate("vaccination_histories")
      .populate("record_of_illnesses");
  }

  async update(id: string, updateWorkerDto: UpdateWorkerDto) {
    if (!isValidObjectId(id)) throw new BadRequestException("Wrong ID");

    return await this.workerModel.findByIdAndUpdate(id, updateWorkerDto, {new: true});
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException("Wrong ID");

    return await this.workerModel.findByIdAndDelete(id);
  }
}
