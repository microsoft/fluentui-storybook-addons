import * as Babel from '@babel/core';

export const PLUGIN_NAME = 'babel-plugin-remove-storybook-parameters';

/**
 * This plugin finds Storybook specific assignments and removes them.
 *
 * Main reason for this change is that sometimes "story" is not a hardcoded string
 * but it is imported from a markdown file, which results in story being undefined
 * and CodeSandbox example not working.
 *
 * Another benefit of removing the Storybook specific assignments is that the
 * resulting example is free of unnecessary clutter.
 */
export default function removeStorybookParameters(babel: typeof Babel): Babel.PluginObj {
  return {
    name: PLUGIN_NAME,
    visitor: {
      ExportNamedDeclaration(path) {
        path.traverse({
          Identifier(idPath) {
            const binding = idPath.scope.getBinding(idPath.node.name);
            binding?.referencePaths?.forEach(path => {
              if (path.parentPath?.isMemberExpression()) {
                path.parentPath.parentPath?.remove();
              }
            });
            idPath.stop();
          },
        });
      },
    },
  };
}
