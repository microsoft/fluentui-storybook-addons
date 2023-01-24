import plugin, { PLUGIN_NAME } from './modifyImports';
import pluginTester from './pluginTester';

pluginTester(plugin, PLUGIN_NAME, {
  '@fluentui/react-unstable-component': { replace: '@fluentui/react-components/unstable' },
});
