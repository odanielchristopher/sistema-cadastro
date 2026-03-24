import { colorsSeed } from './colors.seed';
import { userSeed } from './user.seed';
import { prisma } from './utils/prisma-client';

async function main() {
  await Promise.all([userSeed(), colorsSeed()]);
}

main()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
