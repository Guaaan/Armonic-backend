import { Test, TestingModule } from '@nestjs/testing';
import { DocumentosFirmadosService } from './documentos_firmados.service';

describe('DocumentosFirmadosService', () => {
  let service: DocumentosFirmadosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumentosFirmadosService],
    }).compile();

    service = module.get<DocumentosFirmadosService>(DocumentosFirmadosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
