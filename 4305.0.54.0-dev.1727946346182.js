"use strict";(self["webpackChunk"]=self["webpackChunk"]||[]).push([[4305],{24305:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__);__webpack_require__.d(__webpack_exports__,{default:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__='# Sindri Scripts\n\nThe `sindri/scripts/` directory contains scripts for compiling circuits and generating Zero-Knowledge Proofs remotely using [Sindri](https://sindri.app).\nThis README file will walk you through all of the steps necessary to compile your circuit and generate proofs.\nAs you read through it, you might also find it helpful to refer to external documentation:\n\n- [Circom 2 Documentation](https://docs.circom.io/)\n- [Sindri Documentation](https://sindri.app/docs/)\n\n## Add the Sindri ZK Scripts\n\nIf you\'re seeing this README, then you\'ve probably already figured out this step on your own!\nYou can add the Sindri ZK scripts and related project files to your workspace by clicking the hamburger icon in the upper left corner of the **File Explorer** and selecting **Add Sindri ZK scripts**.\nThis will automatically add this README file, several TypeScript files, a `sindri.json` project manifest, and a `.sindriignore` file to your workspace.\nWe\'ll cover these files in more detail below.\n\n## API Key\n\nTo interact with the Sindri API, you will first need to create a Sindri account, generate an API key, and add it to your Remix IDE settings.\nThis only needs to be done once, your credentials will be shared across all of your current and future workspaces once you\'ve added your API key.\n\n1. Visit [The Sindri Homepage](https://sindri.app/) and request a demo to create your account.\n2. Follow the instructions in the [Access Management](https://sindri.app/docs/topic-guides/access-management/#api-key-creation-and-management) documentation to generate an API key.\n3. Open the **Settings** panel by clicking on the gear icon at the very bottom of the icon panel on the left side of the Remix IDE (see the [Remix IDE Settings](https://remix-ide.readthedocs.io/en/latest/settings.html) documentation if you\'re having trouble finding it.\n4. Navigate to the **Sindri Credentials** section of the **Settings** panel, enter your Sindri API key under **Token**, and click the **Save** button.\n\n## Customize `sindri.json` _(Optional)_\n\nA `sindri.json` file was added to the root of your workspace, and automatically customized to fit your project layout.\nThis file is the **Sindri Manifest** and is required for all projects deployed to Sindri.\nIt\'s also used by the [Sindri CLI](https://github.com/Sindri-Labs/sindri-js) for local circuit operations which don\'t require a Sindri account.\n\nIf the automatic customization missed something, or if you\'d like to make further customizations, then you\'ll need to edit this file yourself.\nWhen editing `sindri.json` in the Remix IDE, you should get in-editor diagnostics and documentation about the format of the file.\nYou can mouse over the different properties and their values to view their documentation and any potential errors with the values.\n\nThe fields that you\'re most likely to want to customize are:\n\n- `name` - This is a unique project identifier for your circuit.\n  You can think of it as being analogous to a GitHub project name or a DockerHub image name.\n  Every time you compile a circuit with Sindri, the compiled circuit will be associated with the project and one or more tags (`latest` by default).\n  We guessed this based on your workspace name, but you can change this to something else if you don\'t like that name.\n- `circuitPath` - This defines the entrypoint for a Circom circuit (_i.e_ the `.circom` source file which contains your `main` component).\n  We did our best to guess this as well, but you\'ll need to update this manually if you refactor your circuit files or the wrong entrypoint was detected.\n\n## Customize `.sindriignore` _(Optional)_\n\nA `.sindriignore` file was automatically added to the root of your workspace when you added the ZK scripts.\nThis file can be used to exclude files and directories from your circuit package when deploying it to Sindri, and it follows the [`.gitignore` Format](https://git-scm.com/docs/gitignore).\nThe generated file includes some sane defaults, but you can feel free to customize it as you see fit.\nThis is particularly useful if you want to exclude files that contain sensitive information like credentials or secret keys.\nExcluding irrelevant files will also have a positive impact on the performance of compiling and generating proofs because less data needs to be transferred.\n\n## Compile the Circuit\n\nThe `scripts/sindri/run_compile.ts` script can be used to compile a new version of your circuit.\nTo run it, you can open the script from the **File Explorer**, then either click the play button icon in the upper left corner of the editor panel or press `CTRL + SHIFT + S`.\nAfter running it, you should see something like\n\n```\nCompiling circuit "multiplier2"...\nCircuit compiled successfully, circuit id: f593a775-723c-4c57-8d75-196aa8c22aa0\n```\n\nindicating that the circuit compiled successfully.\n\nBy default, this newly compiled circuit will be assigned a tag of `latest` and replace any previous circuit with that tag.\nIf you would like to use alternative tags, you can modify the script to pass an array of tags to the `compile()` function call in the script.\nWe recommend starting out with the default of `latest` as you\'re getting started, and then moving towards tighter tag management once you\'re closer to productionizing your circuit.\n\n## Generate a Proof\n\nOnce you\'ve compiled your circuit, you\'re almost ready to use the `scripts/sindri/run_prove.ts` script to generate a proof.\nYou\'ll first need to modify this file to pass in the input signals that you would like to generate a proof for when calling `prove(signals)` (see Circom\'s [Signals & Variables](https://docs.circom.io/circom-language/signals/) documentation if you need a refresher on circuit signals).\nTowards the top of the script, you\'ll see where the `signals` variable is defined.\n\n```typescript\nconst signals: {[name: string]: number | string} = {}\n```\n\nYou\'ll need to modify this object to include a map from your circuit\'s signal names to the values you would like to generate a proof with.\nIf the signals aren\'t set correctly, then you\'ll get an error when you try to generate a proof, so make sure you don\'t skip this step.\n\nWhile the `scripts/sindri/run_prove.ts` script is open in the editor, you can click the play icon or press `CTRL + SHIFT + S` to run the script.\nIf proof generation is successful, you should see an output like this.\n\n```\nProving circuit "multiplier2"...\nProof generated successfully, proof id: 8c457574-99cd-4042-a598-0514ee83ea28\nProof:\n{\n  "pi_a": [\n    "6067132175610399619979395342154926888794311761598436094198046058376456187483",\n    "12601521866404307402196517712981356634013036480344794909770435164414221099781",\n    "1"\n  ],\n  "pi_b": [\n    [\n      "4834637265002576910303922443793957462767968914058257618737938706178679757759",\n      "9112483377654285712375849001111771826297690938023943203596780715231459796539"\n    ],\n    [\n      "10769047435756102293620257834720404252539733306406452142820929656229947907912",\n      "13357635314682194333795190402038393873064494630028726306217246944693858036728"\n    ],\n    [\n      "1",\n      "0"\n    ]\n  ],\n  "pi_c": [\n    "14880777940364750676687351211095959384403767617776048892575602333362895582325",\n    "16991336882479219442414889002846661737157620156103416755440340170710340617407",\n    "1"\n  ],\n  "protocol": "groth16"\n}\n```\n\nYou can either manually copy the proof to wherever you would like to use it, or modify the script to save it to a dedicated location.\n'}}]);
//# sourceMappingURL=4305.0.54.0-dev.1727946346182.js.map