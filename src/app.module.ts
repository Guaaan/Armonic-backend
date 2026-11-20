import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { UploadModule } from "./upload/upload.module";
import { UserModule } from "./user/user.module";
import { PersonaModule } from "./persona/persona.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PacienteModule } from "./paciente/paciente.module";
import { join } from "path";

import { ClinicaModule } from "./clinica/clinica.module";
import { DocumentosFirmadosModule } from "./documentos_firmados/documentos_firmados.module";
import { ProcedimientoModule } from "./procedimiento/procedimiento.module";
import { TipoDocumentoModule } from "./tipo_documento/tipo_documento.module";
import { PagosClinicasModule } from "./pagos_clinicas/pagos_clinicas.module";
import { TemplateDocumentosModule } from "./template_documentos/template_documentos.module";
import { NacionalidadModule } from "./nacionalidad/nacionalidad.module";
import { ComunaModule } from "./comuna/comuna.module";
import { AuthModule } from "src/auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { MailModule } from "./mail/mail.module";
import { TemplateAnexosModule } from "./template_anexo/template_anexos.module";
import { AnexosModule } from "./anexos/anexos.module";
import { RegionModule } from "./region/region.module";
import dataSource from "./database/data-source";

@Module({
  imports: [
    UploadModule,
    UserModule,
    PersonaModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({}),
      dataSourceFactory: async () => {
        await dataSource.initialize();
        return dataSource;
      },
    }),

    PacienteModule,
    // ExpoSdkModule.forRoot(
    //   {
    //     accessToken: process.env.EXPO_ACCESS_TOKEN,
    //   },
    //   true,
    // ),
    AuthModule,
    ClinicaModule,
    DocumentosFirmadosModule,
    ProcedimientoModule,
    TipoDocumentoModule,
    //TemplateAnexosModule,
    PagosClinicasModule,
    TemplateDocumentosModule,
    NacionalidadModule,
    ComunaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    MailModule,
    TemplateAnexosModule,
    AnexosModule,
    RegionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
