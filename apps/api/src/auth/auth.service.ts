import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { ValidateUserDto } from './dto/validate-user';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

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
}
