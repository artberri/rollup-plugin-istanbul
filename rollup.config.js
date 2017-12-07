import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',
  plugins: [babel()],
  external: ['istanbul-lib-instrument', 'rollup-pluginutils'],
  output: [
    {
      format: 'cjs',
      file: 'dist/rollup-plugin-istanbul.cjs.js'
    },
    {
      format: 'es',
      file: 'dist/rollup-plugin-istanbul.es.js'
    }
  ]
};
