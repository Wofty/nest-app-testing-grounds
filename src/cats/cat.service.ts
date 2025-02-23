import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Cat } from './cat.entity';

@Injectable()
export class CatService {
  constructor(
    @Inject('CatRepository')
    private readonly catRepository: Repository<Cat>,
  ) {}

  async findAll(): Promise<Cat[]> {
    return await this.catRepository.find();
  }

  async create(cat: Cat): Promise<Cat> {
    return await this.catRepository.save(cat);
  }
  async findOne(id: number): Promise<Cat> {
    const cat = await this.catRepository.findOne({ where: { id } });
    if (!cat) {
      throw new NotFoundException(`Cat with the id: ${id} not found`);
    }
    return cat;
  }
  async update(id: number, cat: Cat): Promise<Cat> {
    await this.catRepository.update(id, cat);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.catRepository.delete(id);
  }
}
