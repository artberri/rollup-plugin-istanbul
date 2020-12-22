import { babel } from '@rollup/plugin-babel';

export default {
  input: 'src/index.js',
  output: [
    {
      format: 'iife',
      file: './dist/example.js',
      name: 'example'
    },
    {
      format: 'es',
      file: './dist/example.es.js'
    },
    {
      format: 'cjs',
      file: './dist/example.cjs.js'
    },
  ],
  plugins: [babel({ babelHelpers: 'bundled' })],
};
