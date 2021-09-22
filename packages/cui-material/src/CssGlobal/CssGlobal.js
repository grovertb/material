import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { GlobalStyles, useThemeProps } from '@mui/material'

export const html = {
  // Antialiasing.
  MozOsxFontSmoothing: 'grayscale',
  WebkitFontSmoothing: 'antialiased',

  // Fix font resize problem in iOS
  WebkitTextSizeAdjust: '100%',

  // Antialiasing.
  // Change from `box-sizing: content-box` so that `width`
  // is not affected by `padding` or `border`.
  boxSizing: 'border-box'
}

export const body = (theme) => ({
  color         : theme.palette.text.primary,
  ...theme.typography.body1,
  '@media print': {
    // Save printer ink.
    backgroundColor: theme.palette.common.white
  },
  backgroundColor: theme.palette.background.default
})

export const styles = (theme) => {
  let defaultStyles = {
    '*, *::before, *::after': {
      boxSizing: 'inherit'
    },
    body: {
      margin       : 0, // Remove the margin in all browsers.
      ...body(theme),
      // Add support for document.body.requestFullScreen().
      // Other elements, if background transparent, are not supported.
      '&::backdrop': {
        backgroundColor: theme.palette.background.default
      }
    },
    html,
    'strong, b': {
      fontWeight: theme.typography.fontWeightBold
    }
  }

  const themeOverrides = theme.components?.MuiCssGlobal?.styleOverrides
  if(themeOverrides)
    defaultStyles = [ defaultStyles, themeOverrides ]

  return defaultStyles
}

/**
 * Kickstart an elegant, consistent, and simple baseline to build upon.
 */
function CssGlobal(inProps) {
  const props = useThemeProps({ name: 'MuiCssGlobal', props: inProps })
  const { children } = props

  return (
    <Fragment>
      <GlobalStyles styles={styles} />
      {children}
    </Fragment>
  )
}

CssGlobal.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * You can wrap a node.
   */
  children: PropTypes.node
}

export default CssGlobal
