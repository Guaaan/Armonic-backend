import { PartialType } from '@nestjs/swagger';
import { CreateTemplateAnexoDto } from './create-template_anexo.dto';

export class UpdateTemplateAnexoDto extends PartialType(CreateTemplateAnexoDto) {}
