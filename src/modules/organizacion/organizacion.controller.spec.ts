import { Test, TestingModule } from '@nestjs/testing';
import { OrganizacionController } from './organizacion.controller';

describe('OrganizacionController', () => {
  let controller: OrganizacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizacionController],
    }).compile();

    controller = module.get<OrganizacionController>(OrganizacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
