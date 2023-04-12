import React from 'react';
import PropTypes from 'prop-types';
import { connect, Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import '../../scss/app.scss';
import Router from './Router';
import store from './store';
import ScrollToTop from './ScrollToTop';


const ThemeComponent = ({ children, themeName }) => {
  const theme = createTheme({
    palette: {
      type: themeName === 'theme-dark' ? 'dark' : 'dark',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};

ThemeComponent.propTypes = {
  children: PropTypes.shape().isRequired,
  themeName: PropTypes.string.isRequired,
};

const ConnectedThemeComponent = connect(state => ({ themeName: state.theme.className }))(ThemeComponent);

const App = () => {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop>
          <ConnectedThemeComponent>
            <Router />
          </ConnectedThemeComponent>
        </ScrollToTop>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
