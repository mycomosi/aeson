import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';

export default {
    input: 'src/aeson',
    output: {
        file: 'dist/aeson.js',
        format: 'iife',
        name: 'aeson'
    },
    plugins: [
        resolve(),
        eslint(),
        babel(babelrc())
    ]
};
