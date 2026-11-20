import { Module } from '@nestjs/common';
import { TemplateAnexosService } from './template_anexos.service';
import { TemplateAnexosController } from './template_anexos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplateAnexo } from './entities/template_anexo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TemplateAnexo])],
  controllers: [TemplateAnexosController],
  providers: [TemplateAnexosService]
})
export class TemplateAnexosModule {}
