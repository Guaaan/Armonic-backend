import { Module } from '@nestjs/common';
import { TemplateDocumentosService } from './template_documentos.service';
import { TemplateDocumentosController } from './template_documentos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplateDocumento } from './entities/template_documento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TemplateDocumento])],
  controllers: [TemplateDocumentosController],
  providers: [TemplateDocumentosService]
})
export class TemplateDocumentosModule {}
