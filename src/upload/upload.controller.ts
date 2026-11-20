import { Body, Controller, HttpStatus, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import * as moment from "moment";
import { StorageFileDto } from './file.dto';
import { UploadService } from './upload.service';
import { Response } from 'express';

@Controller('upload')
export class UploadController {
    constructor(private uploadService: UploadService) {

    }

    @Post('upload')
    @ApiOperation({ summary: 'Subir archivos gCloud' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
          type: 'object',
          properties: {
            file: {
              type: 'string',
              format: 'binary',
            },
          },
        },
      })

    @UseInterceptors(
        FileInterceptor("file", {
            limits: {
                files: 1
            },
        })
    )
    async uploadFile(
        @Body() data: StorageFileDto,
        @UploadedFile() file: Express.Multer.File,
        @Res() res: Response
    ) {

        const filename = `${moment().unix()}_${file.originalname}.pdf`

        try {
          const fileRes =  await    this.uploadService.uploadFile(
            "media/" + filename,
            file.mimetype, 
            file.buffer,
            [{ mediaId: data.id }]
        );

 
        res.status(HttpStatus.OK).send(fileRes);

        } catch (error) {
          return res.status(400).send({
            message: 'This is an error!',
            error
         });
        }
     
    }
}
