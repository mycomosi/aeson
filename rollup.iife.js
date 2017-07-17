import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';

export default {
    entry: 'src/aeson',
    dest: 'dist/aeson.js',
    format: 'iife',
    moduleName: 'aeson',
    plugins: [
        resolve(),
        eslint(),
        babel(babelrc())
    ]
};
