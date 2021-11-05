import * as Babel from '@babel/core';

interface PluginState extends Babel.PluginPass {
  imports: string[];
}

export const PLUGIN_NAME = 'storybook-stories-modifyImports';

/**
 * Collects all relative import declarations starting starting with '.' and all @fluentui/ scoped imports
 * Replaces all import declarations with one single import declartion from @fluentui/react-components
 *
 * See test fixtures for usage examples
 */
export default function modifyImportsPlugin(babel: typeof Babel): Babel.PluginObj<PluginState> {
  const { types: t } = babel;

  return {
    name: PLUGIN_NAME,
    manipulateOptions: (opts, parserOptions) => {
      parserOptions.plugins.push('classProperties');
      parserOptions.plugins.push('jsx');
      parserOptions.plugins.push('objectRestSpread');
      parserOptions.plugins.push('typescript');
    },
    pre() {
      this.imports = [];
    },
    visitor: {
      Program: {
        exit(path, pluginState) {
          const specifiers = pluginState.imports.map(i => {
            return t.importSpecifier(t.identifier(i), t.identifier(i));
          });

          if (specifiers.length) {
            path.node.body.unshift(t.importDeclaration(specifiers, t.stringLiteral('@fluentui/react-components')));
          }
        },
      },

      ImportDeclaration(path, pluginState) {
        if (
          t.isLiteral(path.node.source) &&
          !path.node.source.value.startsWith('@fluentui/react-icons') && // react-icons is not exported directly by the Fluent suite package
          (path.node.source.value.startsWith('@fluentui/') || path.node.source.value.startsWith('.'))
        ) {
          path.node.specifiers.forEach(specifier => {
            if (
              t.isImportSpecifier(specifier) &&
              t.isIdentifier(specifier.imported) &&
              t.isIdentifier(specifier.local)
            ) {
              pluginState.imports.push(specifier.imported.name);
            }
          });

          path.remove();
        }
      },
    },
  };
}
