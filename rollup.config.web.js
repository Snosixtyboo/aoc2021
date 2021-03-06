import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
    input: 'js/webbase.js',
    output: {
        file: 'build/aoc_web.js',
        format: 'umd'
    },
    plugins: [
        resolve({
            browser: true,
        }),
        commonjs()
    ]
}