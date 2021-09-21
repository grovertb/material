import path from 'path'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from 'rollup-plugin-babel'
import replace from '@rollup/plugin-replace'
import nodeGlobals from 'rollup-plugin-node-globals'
import { terser } from 'rollup-plugin-terser'
import { sizeSnapshot } from 'rollup-plugin-size-snapshot'

const input = './src/index.js'
const globals = {
  react      : 'React',
  'react-dom': 'ReactDOM'
}

const babelOptions = {
  configFile: path.resolve(__dirname, '../../../babel.config.js'),

  exclude: /node_modules/,

  extensions    : [ '.js', '.ts', '.tsx' ],
  // We are using @babel/plugin-transform-runtime
  runtimeHelpers: true
}

const commonjsOptions = {
  ignoreGlobal: true,
  include     : /node_modules/
}

const nodeOptions = {
  extensions: [ '.js', '.tsx', '.ts' ]
}

function onwarn(warning) {
  if(
    warning.code === 'UNUSED_EXTERNAL_IMPORT' &&
    warning.source === 'react' &&
    warning.names.filter((identifier) => identifier !== 'useDebugValue').length === 0
  )
    // only warn for
    // import * as React from 'react'
    // if (__DEV__) React.useDebugValue()
    // React.useDebug not fully dce'd from prod bundle
    // in the sense that it's still imported but unused. Downgrading
    // it to a warning as a reminder to fix at some point
    console.warn(warning.message)
  else
    throw Error(warning.message)
}

const config = [
  {
    external: Object.keys(globals),
    input,
    onwarn,
    output  : {
      file  : 'build/umd/cui-material.development.js',
      format: 'umd',
      globals,
      name  : 'MaterialUI'
    },
    plugins: [
      nodeResolve(nodeOptions),
      babel(babelOptions),
      commonjs(commonjsOptions),
      nodeGlobals(), // Wait for https://github.com/cssinjs/jss/pull/893
      replace({ preventAssignment: true, 'process.env.NODE_ENV': JSON.stringify('development') })
    ]
  },
  {
    external: Object.keys(globals),
    input,
    onwarn,
    output  : {
      file  : 'build/umd/cui-material.production.min.js',
      format: 'umd',
      globals,
      name  : 'MaterialUI'
    },
    plugins: [
      nodeResolve(nodeOptions),
      babel(babelOptions),
      commonjs(commonjsOptions),
      nodeGlobals(), // Wait for https://github.com/cssinjs/jss/pull/893
      replace({ preventAssignment: true, 'process.env.NODE_ENV': JSON.stringify('production') }),
      terser(),
      sizeSnapshot({ snapshotPath: 'size-snapshot.json' })
    ]
  }
]

export default config
