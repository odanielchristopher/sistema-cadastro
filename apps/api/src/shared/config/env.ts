import { plainToInstance, Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  NotEquals,
  ValidateNested,
  validateSync,
} from 'class-validator';

class Account {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

class Env {
  @IsNotEmpty()
  @IsString()
  @NotEquals('unsecure_jwt_secret')
  jwtSecret: string;

  @IsNotEmpty()
  @IsString()
  dbUrl: string;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => Account)
  ownerAccount: Account;
}

export const env: Env = plainToInstance(Env, {
  jwtSecret: process.env.JWT_SECRET,
  dbUrl: process.env.DATABASE_URL,
  ownerAccount: {
    name: process.env.USER_NAME,
    email: process.env.USER_EMAIL,
    password: process.env.USER_PASSWORD,
  },
});

const errors = validateSync(env);

if (errors.length > 0) {
  throw new Error(JSON.stringify(errors, null, 2));
}
