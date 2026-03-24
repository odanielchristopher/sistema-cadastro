import { Injectable, NotFoundException } from '@nestjs/common';

import { UsersRepository } from '@shared/database/contract/users-repository.contract';

import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async me(userId: string): Promise<Omit<User, 'password'>> {
    const user = await this.usersRepository.findById(userId);

    if (!user) throw new NotFoundException('User not found');

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
