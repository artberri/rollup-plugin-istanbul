import babel from 'rollup-plugin-babel'

export default {
  entry: 'src/index.js',
  plugins: [babel()],
  external: ['istanbul', 'rollup-pluginutils'],
  targets: [
    {
      format: 'cjs',
      dest: 'dist/rollup-plugin-istanbul.cjs.js'
    },
    {
      format: 'es6',
      dest: 'dist/rollup-plugin-istanbul.es6.js'
    }
  ]
}
