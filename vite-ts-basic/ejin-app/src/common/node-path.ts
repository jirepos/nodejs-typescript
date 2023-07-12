import path from 'path';

export default function pathinfo() {
  let result = path.join('a', 'b', 'c');
  console.log('pathinfo', result);
}