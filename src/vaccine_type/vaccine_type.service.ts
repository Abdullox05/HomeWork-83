import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateVaccineTypeDto } from './dto/create-vaccine_type.dto';
import { UpdateVaccineTypeDto } from './dto/update-vaccine_type.dto';
import { InjectModel } from '@nestjs/mongoose';
import { VaccineType, VaccineTypeDocument } from './schemas/vaccine_type.schema';
import { Model, isValidObjectId } from 'mongoose';

@Injectable()
export class VaccineTypeService {
  constructor(@InjectModel(VaccineType.name) private vaccineTypeModel: Model<VaccineTypeDocument>) {}

  async create(createVaccineTypeDto: CreateVaccineTypeDto) {
    return await this.vaccineTypeModel.create(createVaccineTypeDto);
  }

  async findAll() {
    return await this.vaccineTypeModel.find().populate("vaccination_histories");
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException("Wrong ID");

    return await this.vaccineTypeModel.findById(id).populate("vaccination_histories");
  }

  async update(id: string, updateVaccineTypeDto: UpdateVaccineTypeDto) {
    if (!isValidObjectId(id)) throw new BadRequestException("Wrong ID");

    return await this.vaccineTypeModel.findByIdAndUpdate(id, updateVaccineTypeDto, {new: true});
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException("Wrong ID");

    return await this.vaccineTypeModel.findByIdAndDelete(id);
  }
}
