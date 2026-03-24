import { User } from '@modules/users/entities/user.entity';

export abstract class UsersRepository {
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findById(id: string): Promise<User | null>;
}
