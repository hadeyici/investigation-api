import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InvestigationsController } from './investigations/investigations.controller';

@Module({
  imports: [],
  controllers: [AppController, InvestigationsController],
  providers: [AppService],
})
export class AppModule {}
