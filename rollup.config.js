import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
    input: 'js/webbase.js',
    output: {
        file: 'build/bundle.js',
        format: 'umd'
    },
    plugins: [
        resolve({
            browser: true,
        }),
        commonjs()
    ],
}