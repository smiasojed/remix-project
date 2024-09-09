"use strict";(self["webpackChunk"]=self["webpackChunk"]||[]).push([[9369],{79369:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,{default:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__="name: Running Mocha Chai Solidity Unit Tests\non: [push]\n\njobs:\n  run_sample_test_job:\n    runs-on: ubuntu-latest\n    name: A job to run mocha and chai tests for solidity on github actions CI\n    steps:\n    - name: Checkout\n      uses: actions/checkout@v2\n    - name: Environment Setup\n      uses: actions/setup-node@v3\n      with:\n        node-version: 20.0.0\n    - name: Run Mocha Chai Unit Test Action\n      uses: EthereumRemix/ts-sol-test@v1.3.1\n      with:\n        test-path: 'tests'\n        contract-path: 'contracts'\n        compiler-version: '0.8.7'\n//      evm-version: 'paris'\n//      optimize: true\n//      optimizer-runs: 200\n//      node-url: 'https://mainnet.infura.io/v3/08b2a484451e4635a28b3d8234f24332'\n//      block-number: 'latest'\n//      hard-fork: 'merge'"}}]);
//# sourceMappingURL=9369.0.54.0-dev.1725890035007.js.map