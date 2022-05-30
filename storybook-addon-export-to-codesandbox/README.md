# Export to CodeSandbox

This Storybook plugin adds "Open in CodeSandbox" button to each story displayed in Docs mode.

## Installation

1. Install the plugin `npm i storybook-addon-export-to-codesandbox`.
2. Register the plugin in `.storybook/main.js` - Add `'storybook-addon-export-to-codesandbox'` to the list of addons.

```js
// .storybook/main.js

module.exports = {
  // ...
  addons: ['storybook-addon-export-to-codesandbox' /* ... */],
};
```

3. Use .storybook/babel.plugin.js in your Storybook.
4. Define required parameters in your `.storybook/preview.js`:

> ⚠️ Make sure all necessary dependencies are included in the `requiredDependencies` config.

```js
export const parameters = {
  exportToCodeSandbox: {
    // Dependencies that should be included with every story
    requiredDependencies: {
      react: 'latest',
      'react-dom': 'latest', // for React
      'react-scripts': 'latest', // necessary when using typescript in CodeSandbox
      '@fluentui/react-components': '^9.0.0-beta', // necessary for FluentProvider
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

## Dependency replacement with Babel plugin

### Configure dependency replacement

It's possible to further configure dependency replacement using babel plugin options.
By default only dependencies that are declared in the babel plugin options will be replaced,
any other dependencies will remain as is.

By default all dependencies will be replaced with `@fluentui/react-components`

```js
// main.js
module.exports = {
  stories: [],
  addons: [],
  webpackFinal: config => {
    if (config.module && config.module.rules) {
      config.module.rules.unshift({
        test: /\.stories\.tsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              [
                require('storybook-addon-export-to-codesandbox').babelPlugin,
                {
                  '@fluentui/react-button': { replace: '@fluentui/react-components' },
                  // imports of @fluentui/react-unstable-component will be replaced with @fluentui/react-components/unstable
                  '@fluentui/react-unstable-component': { replace: '@fluentui/react-components/unstable'}
                }
              ]
            ],
          },
        },
      });
    }
};


```

### Relative imports

> This step runs before any other dependency replacement

When the addon encounters relative imports in a story, the package name of the closest
`package.json` in the file tree will be used.

```json
{
  "name": "@fluentui/react-button",
  "version": "9.0.0-rc.11"
}
```

```ts
// Before
import { Button } from '../index';

// After
import { Button } from '@fluentui/react-button';
```
