import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Investigation } from './investigation.entity';

@Injectable()
export class InvestigationsService {
  constructor(
    @InjectRepository(Investigation)
    private readonly investigationRepository: Repository<Investigation>,
  ) {}

  async create(data: Investigation): Promise<Investigation> {
    try {
      const createdData = await this.investigationRepository.create({
        userName: data.userName,
        eventType: data.eventType,
        deviceName: data.deviceName,
        tags: data.tags,
        data: data.data,
        date: new Date().getTime(),
      });
      return await this.investigationRepository.save(createdData);
    } catch (error) {
      throw new HttpException(
        'Error creating investigation',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
