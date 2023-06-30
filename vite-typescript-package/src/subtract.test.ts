// src/subtract.test.ts
import subtract from './subtract';
// import { subtract } from './subtract';
test('subtracts two numbers', () => {
  expect(subtract(10, 7)).toBe(3);
});