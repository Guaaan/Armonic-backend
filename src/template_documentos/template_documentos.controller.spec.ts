import { Test, TestingModule } from '@nestjs/testing';
import { TemplateDocumentosController } from './template_documentos.controller';
import { TemplateDocumentosService } from './template_documentos.service';

describe('TemplateDocumentosController', () => {
  let controller: TemplateDocumentosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TemplateDocumentosController],
      providers: [TemplateDocumentosService],
    }).compile();

    controller = module.get<TemplateDocumentosController>(TemplateDocumentosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
