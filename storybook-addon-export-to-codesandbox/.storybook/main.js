// This Babel plugin adds context.parameters.fullSource property to Storybook stories,
// which contains source of of the file where story is present.

module.exports = {
  stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['../preset.js', '@storybook/addon-essentials'],
  webpackFinal: config => {
    if (config.module && config.module.rules) {
      config.module.rules.unshift({
        test: /\.stories\.tsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [require('./babel.plugin')],
          },
        },
      });
    }

    return config;
  },
};
