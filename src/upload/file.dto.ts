import { ApiProperty } from "@nestjs/swagger";

export class StorageFileDto {
    
    @ApiProperty()
    id?: string;
    @ApiProperty()
    path?: string;

    @ApiProperty()
    comment: string;
  }