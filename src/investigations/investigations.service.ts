import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Investigation } from './investigation.entity';
import { Readable } from 'stream';
import * as csv from 'csv-parser';
import { EVENT_TYPE } from './enum';
import * as dayjs from 'dayjs';

@Injectable()
export class InvestigationsService {
  constructor(
    @InjectRepository(Investigation)
    private readonly investigationRepository: Repository<Investigation>,
  ) {}

  async upload(file: any) {
    await this.checkfile(file);

    try {
      const readable = new Readable();
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      readable._read = () => {};
      readable.push(file.buffer);
      readable
        .pipe(csv({ separator: '|' }))
        .on('data', async (data: any) => {
          await this.checkData(data);
          const arr = data.tags.split('|');
          const createdData = await this.investigationRepository.create({
            userName: data.userName,
            eventType: data.eventType,
            deviceName: data.deviceName,
            tags: arr[0],
            data: arr[1],
            date: new Date().getTime(),
          });
          createdData.tags = JSON.parse(createdData.tags);
          createdData.data = JSON.parse(createdData.data);
          await this.investigationRepository.save(createdData);
        })
        .on('end', () => {
          return { completed: true };
        });
    } catch (error) {
      throw new HttpException(
        'Error creating investigation',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getInvestigations(params: {
    startDate: string;
    endDate: string;
    eventType?: EVENT_TYPE;
    deviceName?: string;
    userName?: string;
    data?: string;
    tags?: string;
    page: number;
    size: number;
  }): Promise<{ data: Investigation[]; total: number; hasNext: boolean }> {
    if (!params.startDate || !params.endDate) {
      throw new HttpException(
        'startDate and endDate must be sent',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!params.page) {
      params.page = 0;
    }
    if (!params.size) {
      params.size = 20;
    }

    let where: any = {
      date: {
        $gte: dayjs(params.startDate).toDate(),
        $lte: dayjs(params.endDate).toDate(),
      },
    };

    if (params.eventType) {
      where = {
        ...where,
        eventType: params.eventType,
      };
    }
    if (params.deviceName) {
      where = {
        ...where,
        deviceName: params.deviceName,
      };
    }
    if (params.userName) {
      where = {
        ...where,
        userName: params.userName,
      };
    }
    if (params.tags) {
      where = {
        ...where,
        tags: JSON.parse(params.tags),
      };
    }
    if (params.data) {
      where = {
        ...where,
        data: { $nin: [params.data] },
      };
    }

    const [data, total] = await this.investigationRepository.findAndCount({
      where,
      take: params.size,
      skip: params.page * params.size,
      order: {
        date: -1,
      },
    });

    return {
      data,
      total,
      hasNext: (params.page + 1) * params.size < total,
    };
  }

  async checkfile(file: any) {
    const MAX_SIZE = 1024 * 1024 * 10;
    const allowedMimeTypes = ['text/csv'];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new HttpException(
        'The format is not supported',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (file.size > MAX_SIZE) {
      throw new HttpException(
        `The file size is over ${MAX_SIZE / 1024 / 1024}MB.`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async checkData(data: any) {
    if (typeof data.userName !== 'string') {
      throw new HttpException(
        'userName must be string',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (EVENT_TYPE[data.eventType as keyof typeof EVENT_TYPE]) {
      throw new HttpException(
        'eventType has unexpected value',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (typeof data.deviceName !== 'string') {
      throw new HttpException(
        'deviceName must be string',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
