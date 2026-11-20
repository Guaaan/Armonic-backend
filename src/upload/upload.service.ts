import { Injectable, Logger } from '@nestjs/common';
import { DownloadResponse, Storage } from "@google-cloud/storage";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {


  private storage: Storage;
  private bucket: string;

  constructor(
    private config: ConfigService
  ) {

    const configData = {
      projectId: this.config.get('PROJECT_ID'),
      credentials: {
        client_email: this.config.get('CLIENT_EMAIL'),
        private_key:  this.config.get('PRIVATE_KEY').replace(/\\n/g, "\n"),
      },
    }


    this.storage = new Storage(configData);

    this.bucket = this.config.get('STORAGE_MEDIA_BUCKET');
  }

  async uploadFile(
    path: string,
    contentType: string,
    media: Buffer,
    metadata: { [key: string]: string }[]
  ) {


    const object = metadata.reduce((obj, item) => Object.assign(obj, item), {});
    const file = this.storage.bucket(this.bucket).file(path);
   
    const stream = file.createWriteStream();

    return new Promise((resolve, reject) => {
      stream.on("finish", async () => {
     

        resolve(await file.setMetadata({
          metadata: object,
        })
        )
      });
      stream.end(media);

      stream.on('error', (error) => {
        console.error('stream error', error)
        reject(error)
      });
    })




  }

  async delete(path: string) {
    await this.storage
      .bucket(this.bucket)
      .file(path)
      .delete({ ignoreNotFound: true });
  }

}
