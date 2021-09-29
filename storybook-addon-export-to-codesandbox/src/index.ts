export { default as babelPlugin } from "../.storybook/babel.plugin";

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}
// make it work with --isolatedModules
export default {};
