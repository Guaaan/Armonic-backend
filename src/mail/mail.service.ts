import { Injectable } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';
import * as SendGrid from '@sendgrid/mail';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import * as moment from 'moment';

@Injectable()
export class MailService {

  constructor(
    private configService:ConfigService,
    private readonly httpService: HttpService
    ){
    SendGrid.setApiKey(this.configService.get<string>('SEND_GRID_KEY'));
  }
  async create(mail: SendGrid.MailDataRequired,url) {
    

    let image:any = await lastValueFrom(this.httpService.get(url, {responseType: 'arraybuffer'}));
    let returnedB64 = Buffer.from(image.data).toString('base64');

    const date = moment().unix();
    mail.attachments = [
      {
        content: returnedB64,
        filename: date + '-attachment.pdf',
        type: 'application/pdf',
        disposition: 'attachment',
     
      },
    ];
    const transport = await SendGrid.send(mail);

    console.log(`Email successfully dispatched to ${mail.to}`)
    return transport;
  }

  findAll() {
    return `This action returns all mail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mail`;
  }

  update(id: number, updateMailDto: UpdateMailDto) {
    return `This action updates a #${id} mail`;
  }

  remove(id: number) {
    return `This action removes a #${id} mail`;
  }
}
