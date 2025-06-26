import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { ValidateUserDto } from './dto/validate-user';
import { LoginUserDto } from './dto/login';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto } from './dto/login-response';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<ValidateUserDto | null> {
    const user = await this.userService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      return { email: user.email, userId: user.id };
    }
    return null;
  }

  async login(user: LoginUserDto): Promise<LoginResponseDto> {
    const payload = { email: user.email, sub: user.userId };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
