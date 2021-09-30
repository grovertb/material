import { FC, useMemo, useState } from 'react'
import {
  ThemeProvider, createTheme, customTheme, CssGlobal, Box, Drawer, colors, Toolbar, Divider, List,
  ListItemText, Collapse, Container
} from '@grovertb/material'
import { ListItemButton, PaletteMode, useMediaQuery } from '@mui/material'
import { ExpandLess as ExpandLessIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material'
import { Link } from 'react-router-dom'

import AppHeader from './AppHeader'
import pages, { Page } from 'routes/pages'

const drawerWidth = 240

function DrawerListItem({ page, depth }: { page: Page, depth:number }) {
  const [ openCollapse, setOpenCollapse ] = useState(true)
  const { routes, title, path } = page
  const isWithRoutes = routes && routes.length > 0

  const _handleToggleCollapse = () => {
    setOpenCollapse(!openCollapse)
  }

  return (
    <>
      <ListItemButton {...isWithRoutes ? { onClick: _handleToggleCollapse } : { component: Link, to: path || '#' }} >
        <ListItemText
          primary={title}
          primaryTypographyProps={{
            sx: {
              paddingLeft: 2 * depth
            }
          }} />
        {isWithRoutes ? openCollapse ? <ExpandLessIcon /> : <ExpandMoreIcon /> : null}
      </ListItemButton>
      {
        isWithRoutes ? (
          <Collapse in={openCollapse} unmountOnExit>
            {
              renderDrawerList(routes, depth + 1)
            }
          </Collapse>
        ) : null
      }
    </>
  )
}

const renderDrawerList = (routes: Page[], depth:  number) => (
  <List component='nav'>
    {
      routes.map((route, index) => <DrawerListItem depth={depth} key={`listItem-${index}`} page={route} />)
    }
  </List>
)

const Main: FC = ({ children }) => {
  const [ mobileOpen, setMobileOpen ] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

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

  const _handleToggleDrawer = () => {

  }

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      {
        renderDrawerList(pages, 0)
      }
    </div>
  )

  const container = window !== undefined ? () => document.body : undefined

  return (
    <ThemeProvider theme={theme}>
      <CssGlobal />
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <AppHeader
          checked={mode === 'system' ? prefersDarkMode : mode === 'dark'}
          onHandleChangeThemeMode={_handleChangeThemeMode}
          onHandleToggleDrawer={_handleToggleDrawer} />
        <Box
          aria-label='mailbox folders'
          component='nav'
          sx={{ flexShrink: { sm: 0 }, width: { sm: drawerWidth } }}>
          <Drawer
            ModalProps={{
              keepMounted: true
            }}
            container={container}
            onClose={handleDrawerToggle}
            open={mobileOpen}
            sx={{
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              display             : { sm: 'none', xs: 'block' }
            }}
            variant='temporary'>
            {drawer}
          </Drawer>
          <Drawer
            open
            sx={{
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
              display             : { sm: 'block', xs: 'none' }
            }}
            variant='permanent'>
            {drawer}
          </Drawer>
        </Box>
        <Box component='main' sx={{ display: 'flex', flexGrow: 1 }}>
          <Container sx={{ flex: 1, paddingTop: 12.5 }}>
            {children}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default Main
