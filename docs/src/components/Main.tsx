import { FC, useMemo, useState } from 'react'
import { ThemeProvider, createTheme, customTheme, CssGlobal } from '@grovertb/material'
import { PaletteMode, useMediaQuery } from '@mui/material'
import AppHeader from './AppHeader'
import { colors } from '@grovertb/material'

const Main: FC = ({ children }) => {
  // const [ mode, setMode ] = useState('system')
  const [ mode, setMode ] = useState('light')
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const preferredMode = prefersDarkMode ? 'dark' : 'light'

  const theme = useMemo(() => {
    const newTheme = createTheme({
      ...customTheme,
      palette: {
        ...customTheme.palette,
        ...(mode === 'dark' && {
          background: {
            'default': colors.blueDark[800],
            paper    : colors.blueDark[900]
          }
        }),
        mode: mode === 'system' ? preferredMode : mode as PaletteMode
      }
    })

    return newTheme
  }, [ mode, preferredMode ])

  const _handleChangeThemeMode = (checked: boolean) => {
    let paletteMode = 'system'
    paletteMode = checked ? 'dark' : 'light'
    if(paletteMode === null)
      return

    setMode(paletteMode)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssGlobal />
      <AppHeader
        checked={mode === 'system' ? prefersDarkMode : mode === 'dark'}
        onHandleChangeThemeMode={_handleChangeThemeMode} />
      {children}
    </ThemeProvider>
  )
}

export default Main
