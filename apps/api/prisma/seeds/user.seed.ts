import { hash } from 'bcryptjs';

import { SALT } from '@shared/constants.shared';

import { prisma } from './utils/prisma-client';

export async function userSeed() {
  const owner = {
    name: process.env.USER_NAME!,
    email: process.env.USER_EMAIL!,
    password: process.env.USER_PASSWORD!,
  };

  const hashedPassword = await hash(owner.password, SALT);

  await prisma.user.upsert({
    where: { email: owner.email },
    create: { name: owner.name, email: owner.email, password: hashedPassword },
    update: {},
  });

  // eslint-disable-next-line no-console
  console.log('🪪 User seeded successfully');
}
