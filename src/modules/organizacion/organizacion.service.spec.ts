import { Test, TestingModule } from '@nestjs/testing';
import { OrganizacionService } from './organizacion.service';

describe('OrganizacionService', () => {
  let service: OrganizacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizacionService],
    }).compile();

    service = module.get<OrganizacionService>(OrganizacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
