import { Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { Region } from './entities/region.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RegionService {

  constructor(
    @InjectRepository(Region)
    private regionRepository: Repository<Region>,
  ) { }

  create(createRegionDto: CreateRegionDto) {
    return this.regionRepository.save(createRegionDto)
  }

  findAll() {
    return  this.regionRepository.find()
  }

  findOne(id: number) {
    return this.regionRepository.findOne({
      where:{
        id
      }
    })
  }

  update(id: number, updateRegionDto: UpdateRegionDto) {
    return `This action updates a #${id} region`;
  }

  remove(id: number) {
    return `This action removes a #${id} region`;
  }
}
