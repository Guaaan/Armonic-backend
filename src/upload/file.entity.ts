
import { ApiProperty } from '@nestjs/swagger';

export class FileModel {


  @ApiProperty({ example: 1, description: 'The age of the Cat' })
  id: number;


}