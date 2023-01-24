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

    pre() {
      this.foundExports = 0;
    },

    visitor: {
      ExportNamedDeclaration(path) {
        (this.foundExports as number)++;
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

    post(file) {
      if (this.foundExports > 1) {
        console.warn(
          '\n\x1b[33m%s\x1b[0m',
          `WARNING: This file has multiple exports, please fix (${this.foundExports}):`,
        );
        console.warn(file.opts.filename);
        console.log(
          'Having multiple exports in a story causes issues for the CodeSandbox examples. This rule will be enforced in the future.\n',
        );
      }
    },
  };
}
