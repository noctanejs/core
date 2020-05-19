import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import copy from 'rollup-plugin-copy'
import resolve from '@rollup/plugin-node-resolve'
import pkg from './package.json'

export default [
  {
    input: 'src/app.js',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
      { file: pkg.browser, format: 'umd' }
    ],
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: ['node_modules/**']
      }),
      copy({
        targets: [
          { src: 'index.html', dest: 'dist' }
        ]
      })
    ]
  }
]
