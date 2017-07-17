import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';

export default {
    entry: 'src/jason',
    dest: 'dist/jason.js',
    format: 'iife',
    moduleName: 'jason',
    plugins: [
        resolve(),
        eslint(),
        babel(babelrc())
    ]
};
