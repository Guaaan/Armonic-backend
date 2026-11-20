import { Test, TestingModule } from '@nestjs/testing';
import { TemplateAnexosService } from './template_anexos.service';

describe('TemplateAnexosService', () => {
  let service: TemplateAnexosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TemplateAnexosService],
    }).compile();

    service = module.get<TemplateAnexosService>(TemplateAnexosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
