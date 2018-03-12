import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';

export default {
    input: 'src/aeson',
    output: {
        file:'dist/aeson.es.js',
        format: 'es'
    },
    plugins: [
        resolve(),
        eslint()
    ]
};
