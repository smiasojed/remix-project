"use strict";(self["webpackChunk"]=self["webpackChunk"]||[]).push([[5619],{65619:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,{default:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__="/*\nThis file is part of web3.js.\n\nweb3.js is free software: you can redistribute it and/or modify\nit under the terms of the GNU Lesser General Public License as published by\nthe Free Software Foundation, either version 3 of the License, or\n(at your option) any later version.\n\nweb3.js is distributed in the hope that it will be useful,\nbut WITHOUT ANY WARRANTY; without even the implied warranty of\nMERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\nGNU Lesser General Public License for more details.\n\nYou should have received a copy of the GNU Lesser General Public License\nalong with web3.js.  If not, see <http://www.gnu.org/licenses/>.\n*/\n/**\n * The `web3-eth` package allows you to interact with an Ethereum blockchain and Ethereum smart contracts.\n *\n * To use this package standalone and use its methods use:\n * ```ts\n * import { Web3Context } from 'web3-core';\n * import { BlockTags } from 'web3-types';\n * import { DEFAULT_RETURN_FORMAT } from 'web3-types';\n * import { getBalance} from 'web3-eth';\n *\n * getBalance(\n *      new Web3Context('http://127.0.0.1:8545'),\n *      '0x407d73d8a49eeb85d32cf465507dd71d507100c1',\n *      BlockTags.LATEST,\n *      DEFAULT_RETURN_FORMAT\n * ).then(console.log);\n * > 1000000000000n\n * ```\n *\n * To use this package within the `web3` object use:\n * ```ts\n * import Web3 from 'web3';\n *\n * const web3 = new Web3(Web3.givenProvider || 'ws://some.local-or-remote.node:8546');\n * web3.eth.getBalance('0x407d73d8a49eeb85d32cf465507dd71d507100c1').then(console.log);\n * > 1000000000000n\n *```\n *\n * With `web3-eth` you can also subscribe (if supported by provider) to events in the Ethereum Blockchain, using the `subscribe` function. See more at the {@link Web3Eth.subscribe} function.\n */\n/**\n *\n */\nimport 'setimmediate';\nimport { Web3Eth } from './web3_eth.js';\nexport * from './web3_eth.js';\nexport * from './utils/decoding.js';\nexport * from './schemas.js';\nexport * from './constants.js';\nexport * from './types.js';\nexport * from './validation.js';\nexport * from './rpc_method_wrappers.js';\nexport * from './utils/format_transaction.js';\nexport * from './utils/prepare_transaction_for_signing.js';\nexport * from './web3_subscriptions.js';\nexport { detectTransactionType } from './utils/detect_transaction_type.js';\nexport { transactionBuilder } from './utils/transaction_builder.js';\nexport default Web3Eth;\n"}}]);
//# sourceMappingURL=5619.0.54.0-dev.1727946346182.js.map