import pluginTester from 'babel-plugin-tester';
import * as path from 'path';
import plugin, { PLUGIN_NAME } from './fullsource';

const fixturesDir = path.join(__dirname, `__fixtures__/${PLUGIN_NAME}`);

const defaultDependencyReplace = { replace: '@fluentui/react-components' };

pluginTester({
  pluginOptions: {
    '@fluentui/react-button': defaultDependencyReplace,
    '@fluentui/react-menu': defaultDependencyReplace,
    '@fluentui/react-link': defaultDependencyReplace,
  },
  pluginName: PLUGIN_NAME,
  plugin,
  fixtures: fixturesDir,
});
