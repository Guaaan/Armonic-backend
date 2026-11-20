
import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
// import { AuthService } from './auth/auth.service';
// import { JwtAuthGuard } from './auth/jwt-auth.guard';
// import { LocalAuthGuard } from './auth/local-auth.guard';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    // private authService: AuthService
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  // @UseGuards(LocalAuthGuard)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username:{
          type: 'string'
        },
        password:{
          type:'string'
        }
      
      },
    },
  })

  // @Post('auth/login')
  // async login(@Request() req) {
  //   return this.authService.login(req.user);
  // }

  @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
