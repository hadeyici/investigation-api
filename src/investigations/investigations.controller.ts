import {
  Controller,
  Post,
  Get,
  UseInterceptors,
  UploadedFile,
  HttpStatus,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InvestigationsService } from './investigations.service';
import { Investigation } from './investigation.entity';
import { EVENT_TYPE } from './enum';

@Controller('investigations')
export class InvestigationsController {
  constructor(private readonly investigationsService: InvestigationsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile('file') file: any) {
    await this.investigationsService.upload(file);
    return { statusCode: HttpStatus.CREATED, message: 'Success' };
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async getAll(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('eventType') eventType?: EVENT_TYPE,
    @Query('deviceName') deviceName?: string,
    @Query('userName') userName?: string,
    @Query('data') data?: string,
    @Query('tags') tags?: string,
    @Query('page') page?: number,
    @Query('size') size?: number,
  ): Promise<{ data: Investigation[]; total: number; hasNext: boolean }> {
    return this.investigationsService.getInvestigations({
      startDate,
      endDate,
      eventType,
      deviceName,
      userName,
      data,
      tags,
      page,
      size,
    });
  }
}
