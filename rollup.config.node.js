import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
    input: 'js/nodebase.js',
    output: {
        file: 'build/aoc_cli.js',
        format: 'umd'
    },
    plugins: [
        resolve({
            browser: false,
        }),
        commonjs()
    ]
}