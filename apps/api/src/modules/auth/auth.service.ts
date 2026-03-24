import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';

import { UsersRepository } from '@shared/database/contract/users-repository.contract';

import { SignInDto } from './dtos/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRespository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signin(signinDto: SignInDto) {
    const { email, password } = signinDto;

    const user = await this.userRespository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const accessToken = await this.generateAccessToken(user.id!);

    return { accessToken };
  }

  private generateAccessToken(userId: string) {
    return this.jwtService.signAsync({ sub: userId });
  }
}
