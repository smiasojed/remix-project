"use strict";(self["webpackChunk"]=self["webpackChunk"]||[]).push([[1895],{21895:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,{default:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__="\n## CIRCOM ZKP SEMAPHORE WORKSPACE\n\nWelcome to the Remix Circom ZKP Semaphore Workspace.\n\nThe workspace comprises two main directories:\n\n### circuits: Contains sample semaphore contracts. These can be compiled to generate a witness using 'Circom ZKP Compiler' plugin.\n\n### scripts: Provides a sample script designed for a trusted setup using snarkjs. This script also aids in generating Solidity code, which is essential for on-chain deployment.\n\n### first steps:\n\n#### 1) compile the semaphore circuit using the remix circom compiler. This will generate artifacts.\n\n#### 2) execute the file `run_setup.ts`:\nThis step generate a verification key that can be used for generating proof, it will also generate a Solidity contract for on-chain verification. \nNote that this section should only be used for development purposes as this way of running the setup is heavily centralized (although some pieces of this script can be used to achieve that).\nThis generates a verification key (`./zk/build/verification_key.json`) and artifacts from the setup (`./zk/build/zk_setup.txt`).\n\n#### 3) execute the file `run_verification.ts`:\nThis script:\n\t- create a list of identity commitments and add it to a `IncrementalMerkleTree`. The tree is used to generate a merkle proof that a specified identity is actually in the tree  (see`tree.createProof(0)`).\n\t- generate a witness and a proof of execution.\n\t- verify that the proof is valid `(snarkjs.groth16.verify)`\n\t- ultimately verify that the hash generated by the circom compiler is the same as the root hash for the Tree. `(proof1.root.toString() === publicSignals[0]`). This assert that the identity provided to the circuit is actually part of that semaphore group."}}]);
//# sourceMappingURL=1895.0.54.0-dev.1725890035007.js.map