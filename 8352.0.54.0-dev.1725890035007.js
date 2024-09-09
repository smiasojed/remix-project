"use strict";(self["webpackChunk"]=self["webpackChunk"]||[]).push([[8352],{68352:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,{default:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__="/**\n * @param {string} apikey - etherscan api key\n * @param {string} guid - receipt id\n * @param {boolean} isProxyContract - true, if contract is a proxy contract (optional)\n * @returns {{ status, message, succeed }} receiptStatus\n */\nexport const receiptStatus = async (apikey: string, guid: string, isProxyContract?: boolean) => {\n  return await remix.call('etherscan' as any, 'receiptStatus', guid, apikey, isProxyContract)\n}"}}]);
//# sourceMappingURL=8352.0.54.0-dev.1725890035007.js.map