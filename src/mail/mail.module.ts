import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  controllers: [MailController],
  providers: [MailService],
  imports:[  HttpModule]
})
export class MailModule {}
