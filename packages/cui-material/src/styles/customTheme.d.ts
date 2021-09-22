// import { PaletteMode } from '@mui/material'
import { Color } from '..'
import { ThemeOptions } from './createTheme'

declare module '@mui/material/styles' {

  interface PaletteColor extends Color {}

  interface Palette {
    neutral: Palette['primary'];
  }

  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}

declare module '@mui/material/Checkbox' {
  interface CheckboxPropsColorOverrides {
    neutral: true;
  }
}

declare const customTheme: ThemeOptions

export default customTheme
