import pluginTester from 'babel-plugin-tester';
import * as path from 'path';
import plugin, { PLUGIN_NAME } from './modifyImports';

const defaultDependencyReplace = { replace: '@fluentui/react-components' };
const fixturesDir = path.join(__dirname, `__fixtures__/${PLUGIN_NAME}`);
pluginTester({
  pluginOptions: {
    '@fluentui/react-button': defaultDependencyReplace,
    '@fluentui/react-menu': defaultDependencyReplace,
    '@fluentui/react-link': defaultDependencyReplace,
    '@fluentui/react-unstable-component': { replace: '@fluentui/react-components/unstable' },
  },
  pluginName: PLUGIN_NAME,
  plugin,
  fixtures: fixturesDir,
});
