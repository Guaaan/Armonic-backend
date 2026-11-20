import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MailService } from './mail.service';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  async create(@Body() createMailDto: CreateMailDto) {
    const mail = {
      to: createMailDto.to,
      subject: 'Envío de consentimiento Informado',
      from: 'contacto@clinicarmonic.com',
      text: `Estimado(a) cliente. 
      Mediante el siguiente correo electrónico, enviamos tu consentimiento informado firmado, para tu respaldo. Saludos.`,
      html: `<h1>Estimado(a) cliente,
      Mediante el siguiente correo electrónico, enviamos tu consentimiento informado firmado, para tu respaldo.</h1> <br/> Saludos.`
  };
    return await  this.mailService.create(mail,createMailDto.url);
  }

  @Get()
  findAll() {
    return this.mailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMailDto: UpdateMailDto) {
    return this.mailService.update(+id, updateMailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mailService.remove(+id);
  }
}
