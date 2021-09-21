import logo from './logo.svg'
import { Button, Checkbox, styled } from '@grovertb/material'
import { version } from './utils/envs'
import './App.css'

const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
  '&.Mui-checked': {
    color: theme.status.danger
  },
  color: theme.status.danger
}))

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img alt='logo' className='App-logo' src={logo} />
        <Button color='primary' variant='contained'>Hello World</Button>
        <CustomCheckbox checked />
        <p>
          <code>@grovertb/material@v{version}</code>
        </p>
      </header>
    </div>
  )
}

export default App
