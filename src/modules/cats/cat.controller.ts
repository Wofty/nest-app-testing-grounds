import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { CatService } from './cat.service';
import { Cat } from './cat.entity';

@Controller('cats')
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Get()
  async findAll(): Promise<Cat[]> {
    return await this.catService.findAll();
  }

  @Post()
  async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    try {
      return await this.catService.create(createCatDto);
    } catch {
      throw new HttpException(
        'Error creating cat',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Cat> {
    const cat = await this.catService.findOne(id);
    if (!cat) {
      throw new HttpException(
        `The cat with the id: ${id} was not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return cat;
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCatDto: UpdateCatDto,
  ): Promise<Cat> {
    const cat = await this.catService.update(id, updateCatDto);
    if (!cat) {
      throw new HttpException('Cat not found', HttpStatus.NOT_FOUND);
    }
    return cat;
  }

  @Delete()
  async remove(@Param('id') id: number): Promise<void> {
    try {
      await this.catService.remove(id);
    } catch {
      throw new HttpException(
        `Failed to delete the cat`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
