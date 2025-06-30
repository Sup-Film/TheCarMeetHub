import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from '../user/dto/register.dto';
import { User as PrismaUser } from '@prisma/client';
import { User, JwtPayload, LoginResponse } from './interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterUserDto): Promise<User> {
    const prismaUser = await this.userService.create(dto);
    return this.mapPrismaUserToAuthUser(prismaUser);
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const prismaUser = await this.userService.findByEmail(email);
    if (
      prismaUser &&
      prismaUser.password &&
      (await bcrypt.compare(password, prismaUser.password))
    ) {
      return this.mapPrismaUserToAuthUser(prismaUser);
    }
    return null;
  }

  async login(user: User): Promise<{ accessToken: string }> {
    const payload: JwtPayload = {
      userId: user.userId,
      email: user.email,
      role: user.role,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  // สำหรับ Google OAuth
  async validateOAuthLogin(profile: {
    email: string;
    username: string;
  }): Promise<User> {
    let prismaUser = await this.userService.findByEmail(profile.email);
    if (!prismaUser) {
      prismaUser = await this.userService.create({
        email: profile.email,
        name: profile.username,
        password: '', // OAuth user ไม่มี password
        tel: '', // หรือ default อื่น ๆ
      });
    }
    return this.mapPrismaUserToAuthUser(prismaUser);
  }

  private mapPrismaUserToAuthUser(prismaUser: PrismaUser): User {
    return {
      userId: prismaUser.id,
      email: prismaUser.email,
      username: prismaUser.name,
      role: 'attendee', // default, ปรับ logic ตามจริงถ้ามี field role
      passwordHash: prismaUser.password,
      createdAt: undefined, // Prisma model ไม่มี createdAt
    };
  }
}
