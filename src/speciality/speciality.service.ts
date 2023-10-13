import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSpecialityDto } from './dto/create-speciality.dto';
import { UpdateSpecialityDto } from './dto/update-speciality.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Speciality, SpecialityDocument } from './schemas/speciality.schema';
import { Model, isValidObjectId } from 'mongoose';

@Injectable()
export class SpecialityService {
  constructor(@InjectModel(Speciality.name) private specModel: Model<SpecialityDocument>) {}

  async create(createSpecialityDto: CreateSpecialityDto) {
    return await this.specModel.create(createSpecialityDto);
  }

  async findAll() {
    return await this.specModel.find().populate("workers");
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException("Wrong ID");

    return await this.specModel.findById(id).populate("workers");
  }

  async update(id: string, updateSpecialityDto: UpdateSpecialityDto) {
    if (!isValidObjectId(id)) throw new BadRequestException("Wrong ID");

    return await this.specModel.findByIdAndUpdate(id, updateSpecialityDto, {new: true});
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException("Wrong ID");

    return await this.specModel.findByIdAndDelete(id);
  }
}
