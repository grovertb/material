import logo from './logo.svg';
import {Button,Checkbox, styled} from '@grovertb/material'
import {version} from './utils/envs'
import './App.css';

const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
  color: theme.status.danger,
  '&.Mui-checked': {
    color: theme.status.danger,
  },
}));

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Button variant='contained' color='primary'>Hello World</Button>
        <CustomCheckbox checked />
        <p>
          <code>@grovertb/material@v{version}</code>
        </p>
      </header>
    </div>
  );
}

export default App;
