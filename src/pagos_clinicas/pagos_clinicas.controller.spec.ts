import { Test, TestingModule } from '@nestjs/testing';
import { PagosClinicasController } from './pagos_clinicas.controller';
import { PagosClinicasService } from './pagos_clinicas.service';

describe('PagosClinicasController', () => {
  let controller: PagosClinicasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PagosClinicasController],
      providers: [PagosClinicasService],
    }).compile();

    controller = module.get<PagosClinicasController>(PagosClinicasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
