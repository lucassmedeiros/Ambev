import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ThemeProvider } from 'styled-components'
import { SessionProvider } from './context/SessionContext'
import Routes from './routes'
import GlobalStyle from './styles/global'
import * as themeConfig from './styles/themes'

const App = () => {
  return (
    <MuiThemeProvider theme={themeConfig.defaultTheme}>
      <ThemeProvider theme={themeConfig.defaultTheme}>
        <Router>
          <SessionProvider>
            <Routes />
            <GlobalStyle />
            <ToastContainer />
          </SessionProvider>
        </Router>
      </ThemeProvider>
    </MuiThemeProvider>
  )
}

export default App
