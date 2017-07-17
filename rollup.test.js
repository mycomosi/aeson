import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import multiEntry from 'rollup-plugin-multi-entry';
import resolve from 'rollup-plugin-node-resolve';

export default {
  entry: 'test/es6/**/*.js',
  dest: 'test/transpiled/tests.js',
  format: 'es',
  sourceMap: false,
  plugins: [
    resolve(),
    multiEntry(),
    babel(babelrc())
  ]
};
