export function plus(a, b) {
  return a + b;
}

import * as path from "path";
export function print() {
  console.log(path.join("a", "b"));
}

print();