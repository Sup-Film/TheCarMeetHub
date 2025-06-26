import { Injectable, ConflictException } from '@nestjs/common';
import { RegisterUserDto } from './dto/register.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async create(registerUserDto: RegisterUserDto): Promise<User> {
    const existingUser = await this.prismaService.user.findUnique({
      where: { email: registerUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);
    return this.prismaService.user.create({
      data: {
        email: registerUserDto.email,
        password: hashedPassword,
        name: registerUserDto.name,
        tel: registerUserDto.tel,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }
}
