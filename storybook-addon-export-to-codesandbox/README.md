# Export to CodeSandbox

This Storybook plugin adds "Open in CodeSandbox" button to each story displayed in Docs mode.

## Installation

1. Install the plugin `npm i storybook-addon-export-to-codesandbox`.
2. Register the plugin in `.storybook/main.js` - Add `'storybook-addon-export-to-codesandbox'` to the list of addons.
3. Use .storybook/babel.plugin.js in your Storybook.
4. Define required parameters in your `.storybook/preview.js`:

```js
export const parameters = {
  exportToCodeSandbox: {
    // Dependencies that should be included with every story
    requiredDependencies: {
      'react-dom': 'latest', // for React
      'react-scripts': 'latest', // necessary when using typescript in CodeSandbox
      '@fluentui/react-components': '^9.0.0-alpha', // necessary for FluentProvider
    },
    // Content of index.tsx in CodeSandbox
    indexTsx: dedent`
            import * as ReactDOM from 'react-dom';
            import { FluentProvider, webLightTheme } from '@fluentui/react-components';
            import { STORY_NAME as Example } from './example';
            //
            // You can edit this example in "example.tsx".
            //
            ReactDOM.render(
                <FluentProvider theme={webLightTheme}>
                    <Example />
                </FluentProvider>,
                document.getElementById('root'),
            );`,
  },
};
```

## Recommended story setup

Each story should be put into its own file with a `.stories.tsx` extension. This file should not contain a default export, only a single named export, which is the story. All story files should then be re-exported from a file `.stories.tsx` with a default export. See [RFC: Authoring storybook stories](https://github.com/microsoft/fluentui/blob/master/rfcs/convergence/authoring-stories.md) for more details and examples.

This practice is recommended so that the "Open in CodeSandbox" button would export a single story.

## Relative imports

It’s recommended that your stories don’t contain relative imports. If this is unavoidable, in your case, you might use a `codesandbox-dependency` comment to replace the `from` part of your import, during export. It also allows you to specify required version of your dependency.

```ts
import { Button } from '../../Button'; // codesandbox-dependency: @fluentui/react-button ^9.0.0-alpha
```
