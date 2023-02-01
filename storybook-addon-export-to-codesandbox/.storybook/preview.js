import dedent from 'dedent';

/** @type {import('@storybook/addons').Parameters} */
export const parameters = {
  docs: {
    transformSource: (_, story) => story.parameters.fullSource,
  },

  exportToCodeSandbox: {
    requiredDependencies: {
      'react-dom': 'latest', // for React
      'react-scripts': 'latest', // necessary when using typescript in CodeSandbox
      '@fluentui/react-components': '^9.0.0-beta', // necessary for FluentProvider
    },
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
