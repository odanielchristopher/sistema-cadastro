import { Body, Controller, Post } from '@nestjs/common';

import { IsPublic } from '@shared/decorators/is-public.decorator';

import { AuthService } from './auth.service';
import { SignInDto } from './dtos/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('sign-in')
  signin(@Body() signinDto: SignInDto) {
    return this.authService.signin(signinDto);
  }
}
