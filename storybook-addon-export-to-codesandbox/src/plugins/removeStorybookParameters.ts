import * as Babel from '@babel/core';

export const PLUGIN_NAME = 'babel-plugin-remove-storybook-parameters';

/**
 * This plugin finds Storybook "parameters" assignment and removes it, if it contains "story" key.
 * The reason for this is that sometimes "story" is not a hardcoded string, but it is imported from
 * a markdown file, which results in story being undefined and CodeSandbox example not working.
 *
 * Since we dont actually need Storybook parameters in the CodeSandbox anyway,
 * the easiest thing to do is to remove it altogether.
 */
export default function removeStorybookParameters(babel: typeof Babel): Babel.PluginObj {
  const { types: t } = babel;

  return {
    name: PLUGIN_NAME,
    visitor: {
      Identifier(path) {
        if (path.node.name === 'story') {
          const parentPath = path.findParent(
            path =>
              path.isAssignmentExpression() &&
              t.isMemberExpression(path.node.left) &&
              t.isIdentifier(path.node.left.property) &&
              path.node.left.property.name === 'parameters',
          );
          parentPath?.remove();
        }
      },
    },
  };
}
