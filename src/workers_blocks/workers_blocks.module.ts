import { Module } from '@nestjs/common';
import { WorkersBlocksService } from './workers_blocks.service';
import { WorkersBlocksController } from './workers_blocks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkersBlock, WorkersBlockSchema } from './schemas/workers_block.schema';
import { Worker, WorkerSchema } from '.././worker/schemas/worker.schema';
import { Block, BlockSchema } from '.././block/schemas/block.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: WorkersBlock.name, schema: WorkersBlockSchema},
      {name: Worker.name, schema: WorkerSchema},
      {name: Block.name, schema: BlockSchema},
    ]),
  ],
  controllers: [WorkersBlocksController],
  providers: [WorkersBlocksService],
})
export class WorkersBlocksModule {}
