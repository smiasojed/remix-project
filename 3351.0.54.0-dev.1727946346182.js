"use strict";(self["webpackChunk"]=self["webpackChunk"]||[]).push([[3351],{23351:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,{default:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__='import { Bytes } from "@ethersproject/bytes";\nimport { ExternallyOwnedAccount } from "@ethersproject/abstract-signer";\nimport { decrypt as decryptCrowdsale } from "./crowdsale";\nimport { getJsonWalletAddress, isCrowdsaleWallet, isKeystoreWallet } from "./inspect";\nimport { decrypt as decryptKeystore, decryptSync as decryptKeystoreSync, encrypt as encryptKeystore, EncryptOptions, ProgressCallback } from "./keystore";\ndeclare function decryptJsonWallet(json: string, password: Bytes | string, progressCallback?: ProgressCallback): Promise<ExternallyOwnedAccount>;\ndeclare function decryptJsonWalletSync(json: string, password: Bytes | string): ExternallyOwnedAccount;\nexport { decryptCrowdsale, decryptKeystore, decryptKeystoreSync, encryptKeystore, isCrowdsaleWallet, isKeystoreWallet, getJsonWalletAddress, decryptJsonWallet, decryptJsonWalletSync, ProgressCallback, EncryptOptions, };\n//# sourceMappingURL=index.d.ts.map'}}]);
//# sourceMappingURL=3351.0.54.0-dev.1727946346182.js.map