import { Test, TestingModule } from '@nestjs/testing';
import { InvestigationsController } from './investigations.controller';

describe('InvestigationsController', () => {
  let controller: InvestigationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvestigationsController],
    }).compile();

    controller = module.get<InvestigationsController>(InvestigationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
