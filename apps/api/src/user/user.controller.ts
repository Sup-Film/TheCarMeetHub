import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  // GET /user/me - ข้อมูลโปรไฟล์ผู้ใช้ปัจจุบัน (Clean)
  @Get('me')
  getMe(
    @Request() req: { user: { userId: string; email: string; role: string } },
  ) {
    const { userId, email, role } = req.user;
    return { userId, email, role };
  }
}
