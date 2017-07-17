import eslint from 'rollup-plugin-eslint';
import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import uglify from 'rollup-plugin-uglify';
import resolve from 'rollup-plugin-node-resolve';

export default {
    entry: 'src/jason',
    moduleName: 'jason',
    plugins: [
        resolve(),
        eslint(),
        babel(babelrc()),
        uglify()
    ],
    targets: [
        { dest: 'dist/jason.cjs.js', format: 'cjs' },
        { dest: 'dist/jason.umd.js', format: 'umd' },
        { dest: 'dist/jason.min.js', format: 'iife' }
      ]
};
