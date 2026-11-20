import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateDocumentosFirmadoDto } from "./dto/create-documentos_firmado.dto";
import { UpdateDocumentosFirmadoDto } from "./dto/update-documentos_firmado.dto";
import { DocumentosFirmado } from "./entities/documentos_firmado.entity";
import { Anexo } from "src/anexos/entities/anexo.entity";

@Injectable()
export class DocumentosFirmadosService {
  constructor(
    @InjectRepository(DocumentosFirmado)
    private readonly documentosFirmadosRepository: Repository<DocumentosFirmado>,
    @InjectRepository(Anexo)
    private readonly anexosRepository: Repository<Anexo>
  ) {}

  create(
    createDocumentosFirmadoDto: CreateDocumentosFirmadoDto
  ): Promise<DocumentosFirmado> {
    return this.documentosFirmadosRepository.save(createDocumentosFirmadoDto);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    search?: string,
    startDate?: string,
    endDate?: string
  ) {
    const pageNum = Math.max(1, Number(page) || 1);
    const limitNum = Math.min(100, Math.max(1, Number(limit) || 10));

    const queryBuilder = this.documentosFirmadosRepository
      .createQueryBuilder('documento')
      .leftJoinAndSelect('documento.templateDocumento', 'templateDocumento')
      .leftJoinAndSelect('documento.persona', 'persona')
      .leftJoinAndSelect('documento.anexos', 'anexos')
      .leftJoinAndSelect('anexos.templateAnexo', 'templateAnexo');

    // Filtro por búsqueda (RUT o Pasaporte)
    if (search) {
      // CAST numeric rutPasaporte to CHAR so LIKE works on numeric primary column
      // use single quotes in CONCAT and handle possible nulls with IFNULL
      queryBuilder.andWhere(
        `(CAST(persona.rutPasaporte AS CHAR) LIKE :search OR persona.pasaporte LIKE :search OR CONCAT(IFNULL(persona.nombres, ''), ' ', IFNULL(persona.apellidos, '')) LIKE :search)`,
        { search: `%${search}%` }
      );
    }

    // Filtro por rango de fechas
    if (startDate && endDate) {
      queryBuilder.andWhere('documento.fechaFirma BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });
    }

    // Paginación
    const skip = (pageNum - 1) * limitNum;
    queryBuilder.skip(skip).take(limitNum);

    // Ordenar por fecha más reciente
    queryBuilder.orderBy('documento.fechaFirma', 'DESC');

    const [data, total] = await queryBuilder.getManyAndCount();

    return {
      data,
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
    };
  }

  findOne(id: number) {
    return this.documentosFirmadosRepository.findOne({
      where: {
        id,
      },
      relations: ["templateDocumento"],
    });
  }

  update(id: number, updateDocumentosFirmadoDto: UpdateDocumentosFirmadoDto) {
    return this.documentosFirmadosRepository.save(updateDocumentosFirmadoDto);
  }

  async remove(id: number) {
    const documentoFirmado = await this.documentosFirmadosRepository.findOne({
      relations:['anexos'],
      where: {
        id: id,
      },
    });

    if (documentoFirmado.anexos && documentoFirmado.anexos.length > 0) {
      await this.anexosRepository.remove(documentoFirmado.anexos);
    }

    await this.documentosFirmadosRepository.delete(id);
  }
}
