import { AppBar, Toolbar } from '@mui/material'
import { styled } from '@mui/material/styles'

import ThemeModeToggle from './ThemeToggle'

const AppHeader = (props: { checked: boolean; onHandleChangeThemeMode: (checked: boolean) => void }) => (
  <Header color='default'>
    <Toolbar>
      <ThemeModeToggle
        checked={props.checked}
        onChange={props.onHandleChangeThemeMode} />
    </Toolbar>
  </Header>
)

const Header = styled(AppBar, {
  name: 'Header'
})(({ theme }) => ({
  background : theme.palette.mode === 'dark' ? theme.palette.primary[900] : '#FFF',
  borderColor:
  theme.palette.mode === 'dark' ? theme.palette.primary[700] : theme.palette.grey[100],
  borderStyle      : 'solid',
  borderWidth      : 0,
  boxShadow        : 'none',
  // eslint-disable-next-line sort-keys-fix/sort-keys-fix
  borderBottomWidth: 'thin'
}))

export default AppHeader
