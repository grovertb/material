const { override, addWebpackAlias, addBabelPlugin } = require('customize-cra')
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin')
const path = require('path')
const paths = require('react-scripts/config/paths')

const aliases = {}

const _moduleAliases = {
  components: './components',
  containers: './containers'
}

Object.keys(_moduleAliases).forEach(key => {
  aliases[key] = _moduleAliases[key].replace('.', paths.appSrc)
})

module.exports = override(
  config => {
    const pathPackages = path.join(process.cwd(), '..', 'packages')
    config.resolve.plugins[1] = new ModuleScopePlugin([ paths.appSrc, pathPackages ], [ paths.appPackageJson ])
    config.module.rules[1].oneOf[2].include = [ config.module.rules[1].oneOf[2].include, pathPackages ]

    return config
  },
  addWebpackAlias({
    ...aliases,
    '@grovertb/material': path.resolve(__dirname, '../packages/cui-material/src'),
    'react-dom'         : '@hot-loader/react-dom'
  }),
  addBabelPlugin([
    'babel-plugin-module-resolver', {
      alias: {
        '@grovertb/material': path.resolve(__dirname, '../packages/cui-material/src')
      },
      transformFunctions: [ 'require', 'require.context' ]
    }
  ]),
)
