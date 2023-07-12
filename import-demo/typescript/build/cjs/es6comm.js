"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileName = void 0;
const path_1 = __importDefault(require("path"));
function getFileName() {
    return path_1.default.join('a', 'b', 'c ');
}
exports.getFileName = getFileName;
