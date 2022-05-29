// Temporary solution until this issue gets implemented:
// https://github.com/microsoft/fluentui-storybook-addons/issues/2
export { fullSourcePlugin as babelPlugin } from './plugins';
export type { PluginOptions } from './plugins';

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}
// make it work with --isolatedModules
export default {};
