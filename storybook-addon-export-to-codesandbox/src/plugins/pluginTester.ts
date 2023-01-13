import { PluginOptions } from '@babel/core';
import pluginTester from 'babel-plugin-tester';
import * as path from 'path';

export default function (plugin: any, pluginName: string, pluginOptions: PluginOptions = {}) {
  const fixturesDir = path.join(__dirname, `__fixtures__/${pluginName}`);
  const defaultDependencyReplace = { replace: '@fluentui/react-components' };

  pluginTester({
    fixtures: fixturesDir,
    pluginOptions: {
      '@fluentui/react-button': defaultDependencyReplace,
      '@fluentui/react-menu': defaultDependencyReplace,
      '@fluentui/react-link': defaultDependencyReplace,
      ...pluginOptions,
    },
    pluginName,
    plugin,
  });
}
