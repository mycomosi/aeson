import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import multiEntry from 'rollup-plugin-multi-entry';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'test/es6/**/*.js',
  output: {
      file: 'test/transpiled/tests.js',
      format: 'es',
      sourcemap: false
  },
  plugins: [
    resolve(),
    multiEntry(),
    babel(babelrc())
  ]
};
