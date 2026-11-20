import { Module } from '@nestjs/common';
import { DocumentosFirmadosService } from './documentos_firmados.service';
import { DocumentosFirmadosController } from './documentos_firmados.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentosFirmado } from './entities/documentos_firmado.entity';
import { Anexo } from 'src/anexos/entities/anexo.entity';


@Module({
  imports: [TypeOrmModule.forFeature([DocumentosFirmado,Anexo])],
  controllers: [DocumentosFirmadosController],
  providers: [DocumentosFirmadosService]
})
export class DocumentosFirmadosModule {}
