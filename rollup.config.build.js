import autoprefixer from 'autoprefixer'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import alias from '@rollup/plugin-alias'
import cssnano from 'cssnano'
import { terser } from 'rollup-plugin-terser'
import replace from 'rollup-plugin-replace'
import vue from 'rollup-plugin-vue'

const env = process.env.NODE_ENV
const path = require('path')
const resolveDir = dir => path.join(__dirname, dir)
export default{
  input: './src/index.js',
  output: [
    {
      file: './dist/lib-umd.js',
      format: 'umd',
      name: 'dinert-echarts-vue3',
      sourcemap: true,
      globals: {
        echarts: 'echarts',
        lodash: '_',
        vue: 'Vue'
      }
    },
    {
      file: './dist/lib-es.js',
      format: 'es',
      sourcemap: true
    },
    {
      file: './dist/lib-cjs.js',
      format: 'cjs',
      sourcemap: true
    }
  ],
  plugins: [
    vue({
      style: {
        postcssPlugins: [
          autoprefixer(),
        ]
      }
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    commonjs(),
    resolve(),
    postcss({
      plugins: [
        autoprefixer(),
        cssnano()
      ]
    }),
    alias({
      entries:[
        {find: '@', replacement: resolveDir('src')},
        {find: '#', replacement: resolveDir('packages')}
      ]
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
    terser()
  ],
  external: [  //外部库， 使用'umd'文件时需要先引入这个外部库
  'vue',
  'echarts',
  'lodash'
  ]
}