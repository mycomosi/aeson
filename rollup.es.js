import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';

export default {
    entry: 'src/aeson',
    dest: 'dist/aeson.es.js',
    format: 'es',
    plugins: [
        resolve(),
        eslint()
    ]
};
