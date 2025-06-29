/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Controller,
  Request,
  Post,
  Body,
  UseGuards,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  // @Res({ passthrough: true }) passthrough เป็นการบอกว่า Response นี้จะไม่ถูกส่งกลับไปยัง Client ทันที
  async login(
    @Request() req: { user: any },
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } = await this.authService.login(req.user);
    // เก็บลง Cookie และ Message ไปว่า Login สำเร็จ
    res.cookie('access_token', accessToken, {
      httpOnly: true,
    });
    return {
      message: 'Login successful',
    };
  }
}
