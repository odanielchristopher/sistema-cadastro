import { colorsSeed } from './colors.seed';
import { prisma } from './utils/prisma-client';

async function main() {
  await colorsSeed();
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
