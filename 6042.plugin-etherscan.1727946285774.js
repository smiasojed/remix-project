"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([[6042],{

/***/ 96042:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("import { ethers } from 'ethers'\n\n// https://etherscan.io/address/0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2#code\nexport const CREATE2_DEPLOYER_ADDRESS = '0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2'\n\n/**\n * Deploy the given contract using a factory\n * @param {string} address of the factory contract\n * @param {string} contractName name of the contract to deploy\n * @param {Array<any>} args list of constructor' parameters\n * @param {number} salt (using during address generation)\n * @param {number} accountIndex account index from the exposed account\n * @return {string} deployed contract address\n */\nexport const deploy = async (contractName: string, args: Array<any>, salt: string, accountIndex?: number): Promise<string> => {\n  console.log(`deploying ${contractName}`)\n\n  const signer = new ethers.providers.Web3Provider(web3Provider).getSigner(accountIndex)\n\n  const factory = new ethers.Contract(CREATE2_DEPLOYER_ADDRESS, contractDeployerAbi, signer)\n  //@ts-ignore\n  const contract = await ethers.getContractFactory(contractName)\n  const initCode = contract.getDeployTransaction(args)\n\n  const codeHash = ethers.utils.keccak256(initCode.data)\n  const saltBytes = ethers.utils.id(salt)\n  const deployedAddress = await factory.computeAddress(saltBytes, codeHash)\n  try {\n    const tx = await factory.deploy(0, saltBytes, initCode.data)\n    await tx.wait()\n    return deployedAddress\n  } catch (e) {\n    console.error(e.message)\n    console.error(`Please check a contract isn't already deployed at that address`)\n    throw e\n  }\n}\n\nexport const contractDeployerAbi = [\n  {\n    anonymous: false,\n    inputs: [\n      {\n        indexed: true,\n        internalType: 'address',\n        name: 'previousOwner',\n        type: 'address',\n      },\n      {\n        indexed: true,\n        internalType: 'address',\n        name: 'newOwner',\n        type: 'address',\n      },\n    ],\n    name: 'OwnershipTransferred',\n    type: 'event',\n  },\n  {\n    anonymous: false,\n    inputs: [\n      {\n        indexed: false,\n        internalType: 'address',\n        name: 'account',\n        type: 'address',\n      },\n    ],\n    name: 'Paused',\n    type: 'event',\n  },\n  {\n    anonymous: false,\n    inputs: [\n      {\n        indexed: false,\n        internalType: 'address',\n        name: 'account',\n        type: 'address',\n      },\n    ],\n    name: 'Unpaused',\n    type: 'event',\n  },\n  {\n    inputs: [\n      {\n        internalType: 'bytes32',\n        name: 'salt',\n        type: 'bytes32',\n      },\n      {\n        internalType: 'bytes32',\n        name: 'codeHash',\n        type: 'bytes32',\n      },\n    ],\n    name: 'computeAddress',\n    outputs: [\n      {\n        internalType: 'address',\n        name: '',\n        type: 'address',\n      },\n    ],\n    stateMutability: 'view',\n    type: 'function',\n  },\n  {\n    inputs: [\n      {\n        internalType: 'bytes32',\n        name: 'salt',\n        type: 'bytes32',\n      },\n      {\n        internalType: 'bytes32',\n        name: 'codeHash',\n        type: 'bytes32',\n      },\n      {\n        internalType: 'address',\n        name: 'deployer',\n        type: 'address',\n      },\n    ],\n    name: 'computeAddressWithDeployer',\n    outputs: [\n      {\n        internalType: 'address',\n        name: '',\n        type: 'address',\n      },\n    ],\n    stateMutability: 'pure',\n    type: 'function',\n  },\n  {\n    inputs: [\n      {\n        internalType: 'uint256',\n        name: 'value',\n        type: 'uint256',\n      },\n      {\n        internalType: 'bytes32',\n        name: 'salt',\n        type: 'bytes32',\n      },\n      {\n        internalType: 'bytes',\n        name: 'code',\n        type: 'bytes',\n      },\n    ],\n    name: 'deploy',\n    outputs: [],\n    stateMutability: 'nonpayable',\n    type: 'function',\n  },\n  {\n    inputs: [\n      {\n        internalType: 'uint256',\n        name: 'value',\n        type: 'uint256',\n      },\n      {\n        internalType: 'bytes32',\n        name: 'salt',\n        type: 'bytes32',\n      },\n    ],\n    name: 'deployERC1820Implementer',\n    outputs: [],\n    stateMutability: 'nonpayable',\n    type: 'function',\n  },\n  {\n    inputs: [\n      {\n        internalType: 'address payable',\n        name: 'payoutAddress',\n        type: 'address',\n      },\n    ],\n    name: 'killCreate2Deployer',\n    outputs: [],\n    stateMutability: 'nonpayable',\n    type: 'function',\n  },\n  {\n    inputs: [],\n    name: 'owner',\n    outputs: [\n      {\n        internalType: 'address',\n        name: '',\n        type: 'address',\n      },\n    ],\n    stateMutability: 'view',\n    type: 'function',\n  },\n  {\n    inputs: [],\n    name: 'pause',\n    outputs: [],\n    stateMutability: 'nonpayable',\n    type: 'function',\n  },\n  {\n    inputs: [],\n    name: 'paused',\n    outputs: [\n      {\n        internalType: 'bool',\n        name: '',\n        type: 'bool',\n      },\n    ],\n    stateMutability: 'view',\n    type: 'function',\n  },\n  {\n    inputs: [],\n    name: 'renounceOwnership',\n    outputs: [],\n    stateMutability: 'nonpayable',\n    type: 'function',\n  },\n  {\n    inputs: [\n      {\n        internalType: 'address',\n        name: 'newOwner',\n        type: 'address',\n      },\n    ],\n    name: 'transferOwnership',\n    outputs: [],\n    stateMutability: 'nonpayable',\n    type: 'function',\n  },\n  {\n    inputs: [],\n    name: 'unpause',\n    outputs: [],\n    stateMutability: 'nonpayable',\n    type: 'function',\n  },\n  {\n    stateMutability: 'payable',\n    type: 'receive',\n  },\n]\n");

/***/ })

}]);
//# sourceMappingURL=6042.plugin-etherscan.1727946285774.js.map