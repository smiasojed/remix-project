"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([[6530],{

/***/ 76530:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("// SPDX-License-Identifier: GPL-3.0\n/*\n    Copyright 2021 0KIMS association.\n\n    This file is generated with [snarkJS](https://github.com/iden3/snarkjs).\n\n    snarkJS is a free software: you can redistribute it and/or modify it\n    under the terms of the GNU General Public License as published by\n    the Free Software Foundation, either version 3 of the License, or\n    (at your option) any later version.\n\n    snarkJS is distributed in the hope that it will be useful, but WITHOUT\n    ANY WARRANTY; without even the implied warranty of MERCHANTABILITY\n    or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public\n    License for more details.\n\n    You should have received a copy of the GNU General Public License\n    along with snarkJS. If not, see <https://www.gnu.org/licenses/>.\n*/\n\npragma solidity >=0.7.0 <0.9.0;\n\ncontract Groth16Verifier {\n    // Scalar field size\n    uint256 constant r    = 21888242871839275222246405745257275088548364400416034343698204186575808495617;\n    // Base field size\n    uint256 constant q   = 21888242871839275222246405745257275088696311157297823662689037894645226208583;\n\n    // Verification Key data\n    uint256 constant alphax  = <%= vk_alpha_1[0]    %>;\n    uint256 constant alphay  = <%= vk_alpha_1[1]    %>;\n    uint256 constant betax1  = <%= vk_beta_2[0][1]  %>;\n    uint256 constant betax2  = <%= vk_beta_2[0][0]  %>;\n    uint256 constant betay1  = <%= vk_beta_2[1][1]  %>;\n    uint256 constant betay2  = <%= vk_beta_2[1][0]  %>;\n    uint256 constant gammax1 = <%= vk_gamma_2[0][1] %>;\n    uint256 constant gammax2 = <%= vk_gamma_2[0][0] %>;\n    uint256 constant gammay1 = <%= vk_gamma_2[1][1] %>;\n    uint256 constant gammay2 = <%= vk_gamma_2[1][0] %>;\n    uint256 constant deltax1 = <%= vk_delta_2[0][1] %>;\n    uint256 constant deltax2 = <%= vk_delta_2[0][0] %>;\n    uint256 constant deltay1 = <%= vk_delta_2[1][1] %>;\n    uint256 constant deltay2 = <%= vk_delta_2[1][0] %>;\n\n    <% for (let i=0; i<IC.length; i++) { %>\n    uint256 constant IC<%=i%>x = <%=IC[i][0]%>;\n    uint256 constant IC<%=i%>y = <%=IC[i][1]%>;\n    <% } %>\n \n    // Memory data\n    uint16 constant pVk = 0;\n    uint16 constant pPairing = 128;\n\n    uint16 constant pLastMem = 896;\n\n    function verifyProof(uint[2] calldata _pA, uint[2][2] calldata _pB, uint[2] calldata _pC, uint[<%=IC.length-1%>] calldata _pubSignals) public view returns (bool) {\n        assembly {\n            function checkField(v) {\n                if iszero(lt(v, q)) {\n                    mstore(0, 0)\n                    return(0, 0x20)\n                }\n            }\n            \n            // G1 function to multiply a G1 value(x,y) to value in an address\n            function g1_mulAccC(pR, x, y, s) {\n                let success\n                let mIn := mload(0x40)\n                mstore(mIn, x)\n                mstore(add(mIn, 32), y)\n                mstore(add(mIn, 64), s)\n\n                success := staticcall(sub(gas(), 2000), 7, mIn, 96, mIn, 64)\n\n                if iszero(success) {\n                    mstore(0, 0)\n                    return(0, 0x20)\n                }\n\n                mstore(add(mIn, 64), mload(pR))\n                mstore(add(mIn, 96), mload(add(pR, 32)))\n\n                success := staticcall(sub(gas(), 2000), 6, mIn, 128, pR, 64)\n\n                if iszero(success) {\n                    mstore(0, 0)\n                    return(0, 0x20)\n                }\n            }\n\n            function checkPairing(pA, pB, pC, pubSignals, pMem) -> isOk {\n                let _pPairing := add(pMem, pPairing)\n                let _pVk := add(pMem, pVk)\n\n                mstore(_pVk, IC0x)\n                mstore(add(_pVk, 32), IC0y)\n\n                // Compute the linear combination vk_x\n                <% for (let i = 1; i <= nPublic; i++) { %>\n                g1_mulAccC(_pVk, IC<%=i%>x, IC<%=i%>y, calldataload(add(pubSignals, <%=(i-1)*32%>)))\n                <% } %>\n\n                // -A\n                mstore(_pPairing, calldataload(pA))\n                mstore(add(_pPairing, 32), mod(sub(q, calldataload(add(pA, 32))), q))\n\n                // B\n                mstore(add(_pPairing, 64), calldataload(pB))\n                mstore(add(_pPairing, 96), calldataload(add(pB, 32)))\n                mstore(add(_pPairing, 128), calldataload(add(pB, 64)))\n                mstore(add(_pPairing, 160), calldataload(add(pB, 96)))\n\n                // alpha1\n                mstore(add(_pPairing, 192), alphax)\n                mstore(add(_pPairing, 224), alphay)\n\n                // beta2\n                mstore(add(_pPairing, 256), betax1)\n                mstore(add(_pPairing, 288), betax2)\n                mstore(add(_pPairing, 320), betay1)\n                mstore(add(_pPairing, 352), betay2)\n\n                // vk_x\n                mstore(add(_pPairing, 384), mload(add(pMem, pVk)))\n                mstore(add(_pPairing, 416), mload(add(pMem, add(pVk, 32))))\n\n\n                // gamma2\n                mstore(add(_pPairing, 448), gammax1)\n                mstore(add(_pPairing, 480), gammax2)\n                mstore(add(_pPairing, 512), gammay1)\n                mstore(add(_pPairing, 544), gammay2)\n\n                // C\n                mstore(add(_pPairing, 576), calldataload(pC))\n                mstore(add(_pPairing, 608), calldataload(add(pC, 32)))\n\n                // delta2\n                mstore(add(_pPairing, 640), deltax1)\n                mstore(add(_pPairing, 672), deltax2)\n                mstore(add(_pPairing, 704), deltay1)\n                mstore(add(_pPairing, 736), deltay2)\n\n\n                let success := staticcall(sub(gas(), 2000), 8, _pPairing, 768, _pPairing, 0x20)\n\n                isOk := and(success, mload(_pPairing))\n            }\n\n            let pMem := mload(0x40)\n            mstore(0x40, add(pMem, pLastMem))\n\n            // Validate that all evaluations ∈ F\n            <% for (let i=0; i<IC.length; i++) { %>\n            checkField(calldataload(add(_pubSignals, <%=i*32%>)))\n            <% } %>\n\n            // Validate all evaluations\n            let isValid := checkPairing(_pA, _pB, _pC, _pubSignals, pMem)\n\n            mstore(0, isValid)\n             return(0, 0x20)\n         }\n     }\n }");

/***/ })

}]);
//# sourceMappingURL=6530.plugin-etherscan.1727946285774.js.map