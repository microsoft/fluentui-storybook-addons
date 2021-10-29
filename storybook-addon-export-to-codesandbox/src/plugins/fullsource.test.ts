
import pluginTester from 'babel-plugin-tester';
import * as path from 'path';
import plugin, { PLUGIN_NAME } from './fullsource';

const fixturesDir = path.join(__dirname, `__fixtures__/${PLUGIN_NAME}`);
pluginTester({
  pluginName: PLUGIN_NAME,
  plugin,
  fixtures: fixturesDir,
})