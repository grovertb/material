import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { DarkModeOutlined as DarkModeOutlinedIcon, LightModeOutlined as LightModeOutlinedIcon } from '@mui/icons-material'

const ThemeModeToggle = (props: { checked: boolean; onChange: (checked: boolean) => void }) => (
  <Tooltip title={props.checked ? 'Turn on the light' : 'Turn off the light'}>
    <IconButton
      disableTouchRipple
      onClick={() => props.onChange(!props.checked)}
      sx={{
        '& svg': {
          fontSize: (theme) => theme.typography.pxToRem(18)
        },
        bgcolor     : (theme) => (theme.palette.mode === 'dark' ? 'primary.800' : 'transparent'),
        border      : '1px solid',
        borderColor : (theme) => (theme.palette.mode === 'dark' ? 'primary.500' : 'grey.200'),
        borderRadius: 1,
        color       : (theme) => (theme.palette.mode === 'dark' ? 'grey.100' : 'primary.main'),
        p           : '6.5px',
        padding     : (theme) => theme.spacing(1, 1.25)
      }}>
      {
        props.checked ? (
          <LightModeOutlinedIcon fontSize='small' />
        ) : (
          <DarkModeOutlinedIcon fontSize='small' />
        )
      }
    </IconButton>
  </Tooltip>
)

export default ThemeModeToggle
