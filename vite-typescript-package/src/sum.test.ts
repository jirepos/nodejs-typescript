// src/sum.test.ts
import  sum  from './sum';
// import { sum } from './sum';
test('sums two numbers', () => {
  expect(sum(4, 7)).toBe(11);
});