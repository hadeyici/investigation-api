import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InvestigationsService } from './investigations.service';

@Controller('investigations')
export class InvestigationsController {
  constructor(private readonly investigationsService: InvestigationsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile('file') file: any) {
    await this.investigationsService.upload(file);
    return { statusCode: HttpStatus.CREATED, message: 'Success' };
  }
}
