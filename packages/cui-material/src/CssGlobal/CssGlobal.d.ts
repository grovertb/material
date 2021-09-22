import * as React from 'react'
import { StyledComponentProps } from '@mui/material/styles'

export interface CssGlobal extends StyledComponentProps<never> {
  children?: React.ReactNode;
}

export default function CssGlobal(props: CssGlobal): JSX.Element
