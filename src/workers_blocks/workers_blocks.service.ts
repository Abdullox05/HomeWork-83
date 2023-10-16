import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWorkersBlockDto } from './dto/create-workers_block.dto';
import { InjectModel } from '@nestjs/mongoose';
import { WorkersBlock, WorkersBlockDocument } from './schemas/workers_block.schema';
import { Model, isValidObjectId } from 'mongoose';
import { Worker, WorkerDocument } from '.././worker/schemas/worker.schema';
import { Block, BlockDocument } from '.././block/schemas/block.schema';

@Injectable()
export class WorkersBlocksService {
  constructor(
    @InjectModel(WorkersBlock.name) private workersBlockModel: Model<WorkersBlockDocument>,
    @InjectModel(Worker.name) private workerModel: Model<WorkerDocument>,
    @InjectModel(Block.name) private blockModel: Model<BlockDocument>,
  ) {}

  async create(createWorkersBlockDto: CreateWorkersBlockDto) {
    if (!isValidObjectId(createWorkersBlockDto.worker) || !isValidObjectId(createWorkersBlockDto.block))
      throw new BadRequestException("Wrong Worker ID or Block ID");

    const worker = await this.workerModel.findById(createWorkersBlockDto.worker);

    if (!worker) throw new BadRequestException("Worker not found");

    const block = await this.blockModel.findById(createWorkersBlockDto.block);

    if (!block) throw new BadRequestException("Block not found");

    const workersBlock = await this.workersBlockModel.create(createWorkersBlockDto);

    worker.blocks.push(workersBlock.block);

    await worker.save();

    block.workers.push(workersBlock.worker);

    await block.save();

    return workersBlock;
  }

  async findAll() {
    return await this.workersBlockModel.find().populate("worker").populate("block");
  }

  async findOne(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException("Wrong ID");

    return await this.workersBlockModel.findById(id).populate("worker").populate("block");
  }

  async remove(id: string) {
    if (!isValidObjectId(id)) throw new BadRequestException("Wrong ID");

    return await this.workersBlockModel.findByIdAndDelete(id);
  }
}
