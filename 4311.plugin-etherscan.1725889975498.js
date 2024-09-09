"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([[4311],{

/***/ 94311:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("pragma circom 2.0.0;\n\ninclude \"circomlib/circuits/poseidon.circom\";\ninclude \"circomlib/circuits/mux1.circom\";\n\ntemplate MerkleTreeInclusionProof(nLevels) {\n    signal input leaf;\n    signal input pathIndices[nLevels];\n    signal input siblings[nLevels];\n\n    signal output root;\n\n    component poseidons[nLevels];\n    component mux[nLevels];\n\n    signal hashes[nLevels + 1];\n    hashes[0] <== leaf;\n\n    for (var i = 0; i < nLevels; i++) {\n        pathIndices[i] * (1 - pathIndices[i]) === 0;\n\n        poseidons[i] = Poseidon(2);\n        mux[i] = MultiMux1(2);\n\n        mux[i].c[0][0] <== hashes[i];\n        mux[i].c[0][1] <== siblings[i];\n\n        mux[i].c[1][0] <== siblings[i];\n        mux[i].c[1][1] <== hashes[i];\n\n        mux[i].s <== pathIndices[i];\n\n        poseidons[i].inputs[0] <== mux[i].out[0];\n        poseidons[i].inputs[1] <== mux[i].out[1];\n\n        hashes[i + 1] <== poseidons[i].out;\n    }\n\n    root <== hashes[nLevels];\n}");

/***/ })

}]);
//# sourceMappingURL=4311.plugin-etherscan.1725889975498.js.map