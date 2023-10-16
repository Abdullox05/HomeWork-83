import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAnimalsVaccinationDto } from './dto/create-animals_vaccination.dto';
import { InjectModel } from '@nestjs/mongoose';
import { AnimalsVaccination, AnimalsVaccinationDocument } from './schemas/animals_vaccination.schema';
import { Model, isValidObjectId } from 'mongoose';
import { Animal, AnimalDocument } from '.././animal/schemas/animal.schema';
import { VaccinationHistory, VaccinationHistoryDocument } from '.././vaccination_history/schemas/vaccination_history.schema';

@Injectable()
export class AnimalsVaccinationsService {
  constructor(
    @InjectModel(AnimalsVaccination.name) private animalsVaccinationModel: Model<AnimalsVaccinationDocument>,
    @InjectModel(Animal.name) private animalModel: Model<AnimalDocument>,
    @InjectModel(VaccinationHistory.name) private vaccinationHistoryModel: Model<VaccinationHistoryDocument>,
  ) {}

  async create(createAnimalsVaccinationDto: CreateAnimalsVaccinationDto) {
    if (!isValidObjectId(createAnimalsVaccinationDto.animal) || !isValidObjectId(createAnimalsVaccinationDto.vaccination_history))
      throw new BadRequestException("Wrong Animal ID or Vaccination History ID");

    const animal = await this.animalModel.findById(createAnimalsVaccinationDto.animal);

    if (!animal) throw new BadRequestException("Animal not found");

    const vaccinationHistory = await this.vaccinationHistoryModel.findById(createAnimalsVaccinationDto.vaccination_history);

    if (!vaccinationHistory) throw new BadRequestException("Vaccination History not found");

    if (animal.id != vaccinationHistory.animal[0]) throw new BadRequestException("Wrong Animal ID");

    const animalsVaccination = await this.animalsVaccinationModel.create(createAnimalsVaccinationDto);

    animal.vaccination_histories.push(animalsVaccination.vaccination_history);

    await animal.save();

    vaccinationHistory.animal = animalsVaccination.animal;

    await vaccinationHistory.save();

    return animalsVaccination;
  }

  async findAll() {
    return await this.animalsVaccinationModel.find().populate("animal").populate("vaccination_history");
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException("Wrong ID");

    return await this.animalsVaccinationModel.findById(id).populate("animal").populate("vaccination_history");
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException("Wrong ID");

    return await this.animalsVaccinationModel.findByIdAndDelete(id);
  }
}
