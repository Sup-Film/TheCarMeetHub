/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Controller, Request, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: { user: any }) {
    const { accessToken } = await this.authService.login(req.user);
    return {
      accessToken,
    };
  }
}
