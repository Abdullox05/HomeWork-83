import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAnimalTypeDto } from './dto/create-animal_type.dto';
import { UpdateAnimalTypeDto } from './dto/update-animal_type.dto';
import { InjectModel } from '@nestjs/mongoose';
import { AnimalType, AnimalTypeDocument } from './schemas/animal_type.schema';
import { Model, isValidObjectId } from 'mongoose';

@Injectable()
export class AnimalTypeService {
  constructor(@InjectModel(AnimalType.name) private animalTypeModel: Model<AnimalTypeDocument>) {}

  async create(createAnimalTypeDto: CreateAnimalTypeDto) {
    return await this.animalTypeModel.create(createAnimalTypeDto);
  }

  async findAll() {
    return await this.animalTypeModel.find().populate("animals");
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException("Wrong ID");

    return await this.animalTypeModel.findById(id).populate("animals");
  }

  async update(id: string, updateAnimalTypeDto: UpdateAnimalTypeDto) {
    if (!isValidObjectId(id)) throw new BadRequestException("Wrong ID");

    return await this.animalTypeModel.findByIdAndUpdate(id, updateAnimalTypeDto, {new: true});
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException("Wrong ID");

    return await this.animalTypeModel.findByIdAndDelete(id);
  }
}
