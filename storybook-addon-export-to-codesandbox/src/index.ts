// Temporary solution until this issue gets implemented:
// https://github.com/microsoft/fluentui-storybook-addons/issues/2
export { default as babelPlugin } from "./babel.plugin";

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}
// make it work with --isolatedModules
export default {};
