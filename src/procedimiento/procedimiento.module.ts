import { Module } from '@nestjs/common';
import { ProcedimientoService } from './procedimiento.service';
import { ProcedimientoController } from './procedimiento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Procedimiento } from './entities/procedimiento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Procedimiento])],
  controllers: [ProcedimientoController],
  providers: [ProcedimientoService]
})
export class ProcedimientoModule {}
