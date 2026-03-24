import { prisma } from './utils/prisma-client';

const COLORS = [
  { name: 'Vermelho', hex: '#FF0000' },
  { name: 'Laranja', hex: '#FFA500' },
  { name: 'Amarelo', hex: '#FFFF00' },
  { name: 'Verde', hex: '#008000' },
  { name: 'Azul', hex: '#0000FF' },
  { name: 'Anil', hex: '#4B0082' },
  { name: 'Violeta', hex: '#8A2BE2' },
] as const;

export async function colorsSeed() {
  for (const color of COLORS) {
    await prisma.color.upsert({
      where: { name: color.name },
      update: {},
      create: color,
    });
  }

  // eslint-disable-next-line no-console
  console.log('🌈 Colors seeded successfully');
}
