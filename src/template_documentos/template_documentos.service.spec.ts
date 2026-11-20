import { Test, TestingModule } from '@nestjs/testing';
import { TemplateDocumentosService } from './template_documentos.service';

describe('TemplateDocumentosService', () => {
  let service: TemplateDocumentosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TemplateDocumentosService],
    }).compile();

    service = module.get<TemplateDocumentosService>(TemplateDocumentosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
