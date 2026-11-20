import { Test, TestingModule } from '@nestjs/testing';
import { PagosClinicasService } from './pagos_clinicas.service';

describe('PagosClinicasService', () => {
  let service: PagosClinicasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PagosClinicasService],
    }).compile();

    service = module.get<PagosClinicasService>(PagosClinicasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
