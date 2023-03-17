import { ThemeProvider } from 'styled-components';
import { Rota } from './Routes/index';
import theme from './theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
    <Rota/>
    </ThemeProvider>
  );
}

export default App;
