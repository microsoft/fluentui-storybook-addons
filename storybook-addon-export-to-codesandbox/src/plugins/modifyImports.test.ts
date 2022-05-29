import pluginTester from 'babel-plugin-tester';
import * as path from 'path';
import plugin, { PLUGIN_NAME } from './modifyImports';

const fixturesDir = path.join(__dirname, `__fixtures__/${PLUGIN_NAME}`);
pluginTester({
  pluginOptions: { '@fluentui/react-button': {}, '@fluentui/react-menu': {}, '@fluentui/react-link': {} },
  pluginName: PLUGIN_NAME,
  plugin,
  fixtures: fixturesDir,
});
