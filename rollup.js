import eslint from 'rollup-plugin-eslint';
import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import uglify from 'rollup-plugin-uglify';
import resolve from 'rollup-plugin-node-resolve';

export default {
    input: 'src/aeson',
    plugins: [
        resolve(),
        eslint(),
        babel(babelrc()),
        uglify()
    ],
    output: [
        { name: 'aeson', file: 'dist/aeson.cjs.js', format: 'cjs' },
        { name: 'aeson', file: 'dist/aeson.umd.js', format: 'umd' },
        { name: 'aeson', file: 'dist/aeson.min.js', format: 'iife' }
      ]
};
