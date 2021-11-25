import { Controller, Post, Body } from '@nestjs/common';
import { InvestigationsService } from './investigations.service';
import { Investigation } from './investigation.entity';

@Controller('investigations')
export class InvestigationsController {
  constructor(private readonly investigationsService: InvestigationsService) {}

  @Post()
  async create(@Body() investigation: Partial<Investigation>) {
    await this.investigationsService.create(new Investigation(investigation));
  }
}
