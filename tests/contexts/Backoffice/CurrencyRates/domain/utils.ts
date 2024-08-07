export function generateRandomRate(): number {
  return Number(Number(Math.random()).toFixed(2)) * 1000;
}
