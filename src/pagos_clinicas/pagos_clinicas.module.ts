import { Module } from '@nestjs/common';
import { PagosClinicasService } from './pagos_clinicas.service';
import { PagosClinicasController } from './pagos_clinicas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagosClinica } from './entities/pagos_clinica.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PagosClinica])],
  controllers: [PagosClinicasController],
  providers: [PagosClinicasService]
})
export class PagosClinicasModule {}
