import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'

export default (
  { entry: 'src/index.js'
  , targets:  [ { dest: 'dist/bundle.umd.js', format: 'umd' }
              , { dest: 'dist/bundle.es.js', format: 'es' }
              ]
  , moduleName: require('./package.json').name.split('-').map((x, i) => i === 0 ? x : `${x[0]}${x.slice(1)}`).join('')
  , plugins:  [ babel({ babelrc: false
                      , exclude: 'node_modules/**'
                      , presets: [ [ 'latest', { modules: false } ], 'stage-2' ]
                      , plugins: [ 'transform-runtime' ]
                      , runtimeHelpers: true
                      })
              , nodeResolve({ jsnext: true, main: true })
              , commonjs({ include: 'node_modules/**' })
              ]
  }
)
