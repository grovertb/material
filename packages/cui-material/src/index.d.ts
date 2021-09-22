
export * from './styles'
export interface Color {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  A100: string;
  A200: string;
  A400: string;
  A700: string;
}

// eslint-disable-next-line import/first
import * as colors from './colors'
export { colors }

export { default as Button } from './Button'
export { default as Checkbox } from './Checkbox'
export { default as CssGlobal } from './CssGlobal'
