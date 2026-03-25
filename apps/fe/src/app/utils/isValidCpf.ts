export function isValidCPF(cpf: string): boolean {
  if (typeof cpf !== 'string') return false;

  const digits = cpf.replace(/\D/g, '');

  if (digits.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(digits)) return false;

  const numbers = digits.split('').map(Number);

  const calculateDigit = (base: number[], factor: number) => {
    const sum = base.reduce(
      (acc, digit, index) => acc + digit * (factor - index),
      0,
    );
    const remainder = (sum * 10) % 11;
    return remainder === 10 ? 0 : remainder;
  };

  const firstDigit = calculateDigit(numbers.slice(0, 9), 10);
  const secondDigit = calculateDigit(numbers.slice(0, 10), 11);

  return firstDigit === numbers[9] && secondDigit === numbers[10];
}
