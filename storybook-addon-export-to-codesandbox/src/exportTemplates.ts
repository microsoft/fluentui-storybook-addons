export const indexTs = `// @ts-nocheck
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
);`;

export const indexHtml = `<div id="root"></div>`;
