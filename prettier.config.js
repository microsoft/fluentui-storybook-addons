// @ts-check

/**
 * https://prettier.io/docs/en/configuration.html
 * @type {import('prettier').Options}
 */
module.exports = {
  printWidth: 120,
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'all',
  arrowParens: 'avoid',
  overrides: [
    {
      // These files may be run as-is in IE 11 and must not have ES5-incompatible trailing commas
      files: ['*.html', '*.htm'],
      options: {
        trailingComma: 'es5',
      },
    },
  ],
};
