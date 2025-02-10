/* eslint-disable @typescript-eslint/no-var-requires */
const { esbuildDecorators } = require('esbuild-plugin-typescript-decorators');

module.exports = () => {
 return [esbuildDecorators()];
};