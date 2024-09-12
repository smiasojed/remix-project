export const configFileContent = `
{
	"language": "Solidity",
	"settings": {
		"optimizer": {
			"enabled": true,
			"runs": 200
		},
		"outputSelection": {
			"*": {
			"": ["ast"],
			"*": ["abi", "metadata", "devdoc", "userdoc", "storageLayout", "evm.legacyAssembly", "evm.deployedBytecode", "evm.methodIdentifiers"]
			}
		}
	}
}
`
