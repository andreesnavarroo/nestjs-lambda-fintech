/* eslint-disable @typescript-eslint/no-var-requires */
const { esbuildDecorators } = require('esbuild-plugin-typescript-decorators');
const esbuildNodeExternals = require('esbuild-node-externals').default; // 👈 IMPORTANTE

module.exports = () => [
  esbuildDecorators(), 
  esbuildNodeExternals() // 
];
