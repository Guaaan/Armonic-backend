import { Test, TestingModule } from '@nestjs/testing';
import { TemplateAnexosController } from './template_anexos.controller';
import { TemplateAnexosService } from './template_anexos.service';

describe('TemplateAnexosController', () => {
  let controller: TemplateAnexosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TemplateAnexosController],
      providers: [TemplateAnexosService],
    }).compile();

    controller = module.get<TemplateAnexosController>(TemplateAnexosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
