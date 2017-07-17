import eslint from 'rollup-plugin-eslint';
import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import uglify from 'rollup-plugin-uglify';
import resolve from 'rollup-plugin-node-resolve';

export default {
    entry: 'src/aeson',
    moduleName: 'aeson',
    plugins: [
        resolve(),
        eslint(),
        babel(babelrc()),
        uglify()
    ],
    targets: [
        { dest: 'dist/aeson.cjs.js', format: 'cjs' },
        { dest: 'dist/aeson.umd.js', format: 'umd' },
        { dest: 'dist/aeson.min.js', format: 'iife' }
      ]
};
