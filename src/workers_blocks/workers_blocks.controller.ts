import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkersBlocksService } from './workers_blocks.service';
import { CreateWorkersBlockDto } from './dto/create-workers_block.dto';
import { UpdateWorkersBlockDto } from './dto/update-workers_block.dto';

@Controller('workers-blocks')
export class WorkersBlocksController {
  constructor(private readonly workersBlocksService: WorkersBlocksService) {}

  @Post()
  create(@Body() createWorkersBlockDto: CreateWorkersBlockDto) {
    return this.workersBlocksService.create(createWorkersBlockDto);
  }

  @Get()
  findAll() {
    return this.workersBlocksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workersBlocksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkersBlockDto: UpdateWorkersBlockDto) {
    return this.workersBlocksService.update(id, updateWorkersBlockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workersBlocksService.remove(id);
  }
}
