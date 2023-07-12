"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const comm_1 = require("./comm");
(0, comm_1.hello)();
const es6comm_js_1 = require("./es6comm.js");
let filleName = (0, es6comm_js_1.getFileName)();
console.log(filleName);
