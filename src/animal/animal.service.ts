import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Animal, AnimalDocument } from './schemas/animal.schema';
import { Model, isValidObjectId } from 'mongoose';
import { AnimalType, AnimalTypeDocument } from '.././animal_type/schemas/animal_type.schema';

@Injectable()
export class AnimalService {
  constructor(
    @InjectModel(Animal.name) private animalModel: Model<AnimalDocument>,
    @InjectModel(AnimalType.name) private animalTypeModel: Model<AnimalTypeDocument>,
  ) {}

  async create(createAnimalDto: CreateAnimalDto) {
    if (!isValidObjectId(createAnimalDto.animal_type_id)) throw new BadRequestException("Wrong Animal Type ID");

    const animalType = await this.animalTypeModel.findById(createAnimalDto.animal_type_id);

    if (!animalType) throw new BadRequestException("Animal Type not Found");

    const animal = await this.animalModel.create(createAnimalDto);

    animalType.animals.push(animal);

    await animalType.save();

    return animal;
  }

  async findAll() {
    return await this.animalModel.find()
      .populate("animal_type_id")
      //.populate("vaccination_histories")
      //.populate("record_of_illnesses");
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException("Wrong ID");

    return await this.animalModel.findById(id)
    .populate("animal_type_id")
    //.populate("vaccination_histories")
    //.populate("record_of_illnesses");
  }

  async update(id: string, updateAnimalDto: UpdateAnimalDto) {
    if (!isValidObjectId(id)) throw new BadRequestException("Wrong ID");

    return await this.animalModel.findByIdAndUpdate(id, updateAnimalDto, {new: true});
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException("Wrong ID");

    return await this.animalModel.findByIdAndDelete(id);
  }
}
