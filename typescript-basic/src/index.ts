/* @ts-ignore */
import hello from './hello.ts'; 
import { MYURL } from './util.js'
import User from './classes/user.ts';

let user = new User('John Doe', 'john@gmail.com'); 
console.log(user);
hello();
console.log(MYURL);



