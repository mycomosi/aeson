import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';

export default {
    entry: 'src/jason',
    dest: 'dist/jason.es.js',
    format: 'es',
    plugins: [
        resolve(),
        eslint()
    ]
};
