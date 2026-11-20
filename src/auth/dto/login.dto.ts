
import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
  @ApiProperty({default:'123@gmail.com'})
  email: string;

  @ApiProperty({default:'123456'})
  password: string;
}