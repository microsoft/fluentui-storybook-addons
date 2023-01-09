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
 *
 * The code:
 *  - traverses the program and finds any named exports
 *    - `export` in `export const ButtonAppearance = () => (...`
 *  - finds the first identifier in those exports and saves the name
 *    of those exports to a variable (scoped to the file)
 *    - `ButtonApperance` in `export const ButtonAppearance`
 *  - traverses the program and finds any MemberExpressions
 *  - if the expression's `object` part is an identifier and its name
 *    was saved in the step no. 2, then:
 *    - we try to find the parent AssignmentExpression and if we do,
 *      we remove it.
 *
 */
export default function removeStorybookParameters(babel: typeof Babel): Babel.PluginObj {
  const { types: t } = babel;

  return {
    name: PLUGIN_NAME,
    visitor: {
      // It's important to visit Program first and traverse manually, because we need the
      // exportNodes to be scoped to the file (program)
      Program(program) {
        let exportNodes: string[] = [];

        program.traverse({
          ExportNamedDeclaration(path) {
            let foundIdForThisExport = false;

            path.traverse({
              Identifier(idPath) {
                // Only do this once, we don't want to save any identifiers deeper in the tree
                if (!foundIdForThisExport) {
                  exportNodes.push(idPath.node.name);
                  foundIdForThisExport = true;
                }
              },
            });
          },

          MemberExpression(path) {
            // check if the name of the object in the memberExpression was exported in this file
            if (t.isIdentifier(path.node.object) && exportNodes.includes(path.node.object.name)) {
              // we actually have to find the parent, because otherwise we'd just be removing
              // a left side of an assignment, which breaks things.
              const parentPath = path.findParent(path => path.isAssignmentExpression());
              parentPath?.remove();
            }
          },
        });
      },
    },
  };
}
