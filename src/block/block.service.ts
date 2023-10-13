import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBlockDto } from './dto/create-block.dto';
import { UpdateBlockDto } from './dto/update-block.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Block, BlockDocument } from './schemas/block.schema';
import { Model, isValidObjectId } from 'mongoose';

@Injectable()
export class BlockService {
  constructor(@InjectModel(Block.name) private blockModel: Model<BlockDocument>) {}

  async create(createBlockDto: CreateBlockDto) {
    return await this.blockModel.create(createBlockDto);
  }

  async findAll() {
    return await this.blockModel.find().populate("workers");
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException("Wrong ID");

    return await this.blockModel.findById(id).populate("workers");
  }

  async update(id: string, updateBlockDto: UpdateBlockDto) {
    if (!isValidObjectId(id)) throw new BadRequestException("Wrong ID");

    return this.blockModel.findByIdAndUpdate(id, updateBlockDto, {new: true});
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException("Wrong ID");

    return this.blockModel.findByIdAndDelete(id);
  }
}
