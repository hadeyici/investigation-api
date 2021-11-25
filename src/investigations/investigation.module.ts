import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Investigation } from './investigation.entity';
import { InvestigationsController } from './investigations.controller';
import { InvestigationsService } from './investigations.service';

@Module({
  imports: [TypeOrmModule.forFeature([Investigation])],
  controllers: [InvestigationsController],
  providers: [InvestigationsService],
})
export class InvestigationsModule {}
