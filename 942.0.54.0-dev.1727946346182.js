"use strict";(self["webpackChunk"]=self["webpackChunk"]||[]).push([[942],{80942:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,{default:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__="import { ethers, BigNumber } from 'ethers'\nimport { IncrementalMerkleTree } from \"@zk-kit/incremental-merkle-tree\"\nimport { poseidon } from \"circomlibjs\" // v0.0.8\n\n// eslint-disable-next-line @typescript-eslint/no-var-requires\nconst snarkjs = require('snarkjs');\n\nconst logger = {\n  info: (...args) => console.log(...args),\n  debug: (...args) => console.log(...args),\n  error: (...args) => console.error(...args),\n}\n\n/**\n * Creates a keccak256 hash of a message compatible with the SNARK scalar modulus.\n * @param message The message to be hashed.\n * @returns The message digest.\n */\nfunction hash(message: any): bigint {\n  message = BigNumber.from(message).toTwos(256).toHexString()\n  message = ethers.utils.zeroPad(message, 32)\n  return BigInt(ethers.utils.keccak256(message)) >> BigInt(8)\n}\n\n(async () => {\n  try {\n    // @ts-ignore\n    const r1csBuffer = await remix.call('fileManager', 'readFile', 'circuits/.bin/semaphore.r1cs', true);\n    // @ts-ignore\n    const r1cs = new Uint8Array(r1csBuffer);\n    // @ts-ignore\n    await remix.call('circuit-compiler', 'compile', 'circuits/semaphore.circom');\n    // @ts-ignore\n    const wasmBuffer = await remix.call('fileManager', 'readFile', 'circuits/.bin/semaphore.wasm', true);\n    // @ts-ignore\n    const wasm = new Uint8Array(wasmBuffer);\n\n    const zkey_final = {\n      type: \"mem\",\n      // @ts-ignore\n      data: new Uint8Array(await remix.call('fileManager', 'readFile', 'scripts/plonk/zk/keys/zkey_final.txt', { encoding: null }))\n    }\n    const wtns = { type: \"mem\" };\n\n    const vKey = JSON.parse(await remix.call('fileManager', 'readFile', 'scripts/plonk/zk/keys/verification_key.json'))\n\n    // build list of identity commitments\n    const secrets = []\n    const identityCommitments = []\n    for (let k = 0; k < 2; k++) {\n      const identityTrapdoor = BigInt(ethers.utils.hexlify(ethers.utils.randomBytes(32)))\n      const identityNullifier = BigInt(ethers.utils.hexlify(ethers.utils.randomBytes(32)))\n      secrets.push({ identityTrapdoor, identityNullifier })\n\n      const secret = poseidon([identityNullifier, identityTrapdoor])\n      const identityCommitment = poseidon([secret])\n      identityCommitments.push(identityCommitment)\n    }\n    //console.log('incremental tree', identityCommitments.map((x) => x.toString()))\n\n    let tree\n\n    try {\n      tree = new IncrementalMerkleTree(poseidon, 20, BigInt(0), 2, identityCommitments) // Binary tree.\n    } catch (e) {\n      console.error(e.message)\n      return\n    }\n    const index = tree.indexOf(identityCommitments[0])\n\n    console.log(index.toString())\n\n    const proof1 = tree.createProof(0)\n\n    console.log('prepare signals for id ', identityCommitments[0].toString(), tree.indexOf(identityCommitments[0]), proof1.siblings.map((x)=> x.toString()))\n\n    const signals = {\n      identityTrapdoor: secrets[0].identityTrapdoor,\n      identityNullifier: secrets[0].identityNullifier,\n      treePathIndices: proof1.pathIndices,\n      treeSiblings: proof1.siblings,\n      externalNullifier: hash(42),\n      signalHash: hash(ethers.utils.formatBytes32String(\"Hello World\"))\n    }\n\n    console.log('calculate')\n    await snarkjs.wtns.calculate(signals, wasm, wtns);\n\n    console.log('check')\n    await snarkjs.wtns.check(r1cs, wtns, logger);\n\n    console.log('prove')\n    const { proof, publicSignals } = await snarkjs.plonk.prove(zkey_final, wtns);\n\n    const verified = await snarkjs.plonk.verify(vKey, publicSignals, proof, logger);\n    console.log('zk proof validity', verified);\n    proof1.root.toString() === publicSignals[0] ? console.log('merkle proof valid') : console.log('merkle proof invalid')\n\n    const templates = {\n      plonk: await remix.call('fileManager', 'readFile', 'templates/plonk_verifier.sol.ejs')\n    }\n    const solidityContract = await snarkjs.zKey.exportSolidityVerifier(zkey_final, templates)\n\n    await remix.call('fileManager', 'writeFile', 'scripts/plonk/zk/build/zk_verifier.sol', solidityContract)\n    await remix.call('fileManager', 'writeFile', 'scripts/plonk/zk/build/input.json', JSON.stringify({\n      _proof: [\n        ethers.utils.hexZeroPad(ethers.BigNumber.from(proof.A[0]).toHexString(), 32),\n        ethers.utils.hexZeroPad(ethers.BigNumber.from(proof.A[1]).toHexString(), 32),\n        ethers.utils.hexZeroPad(ethers.BigNumber.from(proof.B[0]).toHexString(), 32),\n        ethers.utils.hexZeroPad(ethers.BigNumber.from(proof.B[1]).toHexString(), 32),\n        ethers.utils.hexZeroPad(ethers.BigNumber.from(proof.C[0]).toHexString(), 32),\n        ethers.utils.hexZeroPad(ethers.BigNumber.from(proof.C[1]).toHexString(), 32),\n        ethers.utils.hexZeroPad(ethers.BigNumber.from(proof.Z[0]).toHexString(), 32),\n        ethers.utils.hexZeroPad(ethers.BigNumber.from(proof.Z[1]).toHexString(), 32),\n        ethers.utils.hexZeroPad(ethers.BigNumber.from(proof.T1[0]).toHexString(), 32),\n        ethers.utils.hexZeroPad(ethers.BigNumber.from(proof.T1[1]).toHexString(), 32),\n        ethers.utils.hexZeroPad(ethers.BigNumber.from(proof.T2[0]).toHexString(), 32),\n        ethers.utils.hexZeroPad(ethers.BigNumber.from(proof.T2[1]).toHexString(), 32),\n        ethers.utils.hexZeroPad(ethers.BigNumber.from(proof.T3[0]).toHexString(), 32),\n        ethers.utils.hexZeroPad(ethers.BigNumber.from(proof.T3[1]).toHexString(), 32),\n        ethers.utils.hexZeroPad(ethers.BigNumber.from(proof.Wxi[0]).toHexString(), 32),\n        ethers.utils.hexZeroPad(ethers.BigNumber.from(proof.Wxi[1]).toHexString(), 32),\n        ethers.utils.hexZeroPad(ethers.BigNumber.from(proof.Wxiw[0]).toHexString(), 32),\n        ethers.utils.hexZeroPad(ethers.BigNumber.from(proof.Wxiw[1]).toHexString(), 32),\n        ethers.utils.hexZeroPad(ethers.BigNumber.from(proof.eval_a).toHexString(), 32),\n        ethers.utils.hexZeroPad(ethers.BigNumber.from(proof.eval_b).toHexString(), 32),\n        ethers.utils.hexZeroPad(ethers.BigNumber.from(proof.eval_c).toHexString(), 32),\n        ethers.utils.hexZeroPad(ethers.BigNumber.from(proof.eval_s1).toHexString(), 32),\n        ethers.utils.hexZeroPad(ethers.BigNumber.from(proof.eval_s2).toHexString(), 32),\n        ethers.utils.hexZeroPad(ethers.BigNumber.from(proof.eval_zw).toHexString(), 32),\n      ],\n      _pubSignals: publicSignals\n    }, null, 2))\n\n    console.log('proof done.')\n  } catch (e) {\n    console.error(e.message)\n  }\n})()\n"}}]);
//# sourceMappingURL=942.0.54.0-dev.1727946346182.js.map