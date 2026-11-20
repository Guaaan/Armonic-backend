import { Test, TestingModule } from '@nestjs/testing';
import { DocumentosFirmadosController } from './documentos_firmados.controller';
import { DocumentosFirmadosService } from './documentos_firmados.service';

describe('DocumentosFirmadosController', () => {
  let controller: DocumentosFirmadosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentosFirmadosController],
      providers: [DocumentosFirmadosService],
    }).compile();

    controller = module.get<DocumentosFirmadosController>(DocumentosFirmadosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
