import { PartialType } from '@nestjs/swagger';
import { CreatePagosClinicaDto } from './create-pagos_clinica.dto';

export class UpdatePagosClinicaDto extends PartialType(CreatePagosClinicaDto) {}
