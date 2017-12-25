import * as React from 'react';
import * as ReactDOM from "react-dom";
import App from "./components/app";
import { AppContainer } from 'react-hot-loader';

const render = (Component) => {
    ReactDOM.render(
      <AppContainer>
        <Component />
      </AppContainer>,
      document.getElementById('root'),
    )
  }
  
  render(App);
  
  // Webpack Hot Module Replacement API
  if (module.hot) {
    module.hot.accept(() => { render(App) })
  }
