import { PartialType } from '@nestjs/swagger';
import { CreateTemplateDocumentoDto } from './create-template_documento.dto';

export class UpdateTemplateDocumentoDto extends PartialType(CreateTemplateDocumentoDto) {}
