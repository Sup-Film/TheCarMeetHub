import { Controller, Request, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

import { LocalAuthGuard } from './local-auth.guard';

interface AuthenticatedRequest {
  user: {
    email: string;
    userId: number;
  };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req: { user: AuthenticatedRequest },
  ): Promise<AuthenticatedRequest> {
    console.log(req.user);
    return req.user;
  }
}
