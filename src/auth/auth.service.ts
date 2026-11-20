import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { omit } from 'lodash';
import { UserService } from 'src/user/user.service';
import { JWTPayload } from './jwt.payload';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<boolean> {
    const user = await this.usersService.findUserByEmail(email);
    return await user.validatePassword(password);
  }

  async generateAccessToken(email: string) {
    const user = await this.usersService.findUserByEmail(email);
    const payload: JWTPayload = { id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: omit(user,'password')
    };
  }
}