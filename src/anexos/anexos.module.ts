import { Module } from '@nestjs/common';
import { AnexosService } from './anexos.service';
import { AnexosController } from './anexos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Anexo } from './entities/anexo.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Anexo])],
  controllers: [AnexosController],
  providers: [AnexosService]
})
export class AnexosModule {}
