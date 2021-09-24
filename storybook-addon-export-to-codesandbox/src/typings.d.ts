declare module 'global';
declare module '!!raw-loader!*' {
  const contents: string;
  export = contents;
}
