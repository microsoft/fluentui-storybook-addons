
import * as Babel from '@babel/core';
import modifyImportsPlugin from './modifyImports';

export const PLUGIN_NAME = 'storybook-stories-fullsource';

/**
 * This Babel plugin adds `context.parameters.fullSource` property to Storybook stories,
 * which contains source of of the file where story is present.
 *
 * Specifically, it finds this expression in a story file: storyName.parameters = ...
 * And adds the following expression after it: storyName.parameters.fullSource = __STORY__;
 *
 * The __STORY__ variable is added to each story file by
 * [Storybook’s webpack loader](https://github.com/storybookjs/storybook/tree/next/lib/source-loader)
 * and contains source code of the story file.
 *
 * This plugin is utilized by Export to CodeSandbox.
 *
 * @param {import('@babel/core')} babel
 * @returns {import('@babel/core').PluginObj}
 */
export default function (babel: typeof Babel): Babel.PluginObj {
  const { types: t } = babel;
  return {
    name: PLUGIN_NAME,
    visitor: {
      VariableDeclarator(path, state) {
        if (
          t.isIdentifier(path.node.id) &&
          t.isStringLiteral(path.node.init) &&
          path.node.id.name === '__STORY__' &&
          path.parentPath.isVariableDeclaration()
        ) {
          const transformedCode = transformImportStatements(babel, path.node.init.value, state.file.opts);
          path.get('init').replaceWith(t.stringLiteral(transformedCode));
        }
      },

      MemberExpression(path) {
        if (
          t.isIdentifier(path.node.property) &&
          t.isIdentifier(path.node.object) &&
          path.node.property.name === 'parameters' &&
          path.parentPath.isAssignmentExpression()
        ) {
          const storyName = path.node.object.name;
          const expression = t.expressionStatement(
            t.assignmentExpression(
              '=',
              t.memberExpression(
                t.memberExpression(t.identifier(storyName), t.identifier('parameters')),
                t.identifier('fullSource'),
              ),
              t.identifier('__STORY__'),
            ),
          );
          const expressionStatement = path.findParent(p => p.isExpressionStatement());
          expressionStatement.insertAfter(expression);
          path.stop();
        }
      },
    },
  };
}

/**
 * Transforms the source code so that all @fluentui/ imports are from @fluentui/react-components
 *
 * @param babel babel API
 * @param code source code
 * @returns source code with transformed import statements
 */
export function transformImportStatements(babel: typeof Babel, code: string, opts: Babel.TransformOptions): string {
  return babel.transformSync(code, {
    ...opts,
    comments: false,
    plugins: [modifyImportsPlugin],
  }).code;
}
