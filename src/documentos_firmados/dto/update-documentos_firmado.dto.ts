import { PartialType } from '@nestjs/swagger';
import { CreateDocumentosFirmadoDto } from './create-documentos_firmado.dto';

export class UpdateDocumentosFirmadoDto extends PartialType(CreateDocumentosFirmadoDto) {}
