#!/usr/bin/env node
"use strict";

let fs = require("fs");
let path = require("path");
let env = process.argv[2];
const envObj = process.env;
const { ENV, Env } = envObj;

if (!env && (ENV || Env)) {
  env = ENV || Env;
  console.log("Jenkins部署时，构建机的环境参数 ", env);
}

if (!env) {
  // console.log('process.env.ENV', process.env.ENV)
  // console.log('process.env.Env', process.env.Env)
  console.log("未传入环境参数，将其设定为 prod");
  env = "prod";
}
let envPrefix = env;

const sourceConfigFilePath = path.join(
  __dirname,
  `./configs/${envPrefix}.env.js`
);
const targetConfigFilePath = path.join(
  __dirname,
  `../src/configs/env.config.js`
);
let configFile = fs.readFileSync(sourceConfigFilePath, "utf8");
configFile = configFile.replace(
  "const envStr = '---'",
  `const envStr = '${env}'`
);
const config = `// 此文件由脚本 ./bin/index.js 生成
// 请勿手动更改，请至 /bin/configs/ 中查看和修改不同环境的文件

${configFile}
`;

fs.writeFileSync(targetConfigFilePath, config);

console.log(`${env} 环境配置已生效`);
