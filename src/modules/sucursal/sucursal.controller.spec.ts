import { Test, TestingModule } from '@nestjs/testing';
import { SucursalController } from './sucursal.controller';

describe('SucursalController', () => {
  let controller: SucursalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SucursalController],
    }).compile();

    controller = module.get<SucursalController>(SucursalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
