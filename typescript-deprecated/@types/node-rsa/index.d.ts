// 기본 버전
// https://github.com/Gloridea/ts-seminar-dts/blob/master/%40types/node-rsa/index.d.ts
declare module 'node-rsa' {
  interface NodeRsa {
      decrypt(message: string, encoding?: string): Buffer;
      encrypt(message: string, encoding?: string): Buffer;
  }

  interface NodeRsaConstructor {
    // https://fettblog.eu/typescript-interface-constructor-pattern/
      new (privateKey: string): NodeRsa;
  }

  let k: NodeRsaConstructor;
  export = k;
}

// Interface 추가 export 버전
// declare module 'node-rsa' {
//     namespace NodeRsaNS {
//         export interface NodeRsaConstructor {
//             new (privateKey: string): NodeRsa;
//         }
//
//         export interface NodeRsa {
//             decrypt(message: string, encoding?: string): Buffer;
//             encrypt(message: string, encoding?: string): Buffer;
//         }
//     }
//
//     const NodeRsaNS: NodeRsaNS.NodeRsaConstructor;
//
//     export = NodeRsaNS;
// }