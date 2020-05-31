import App from '../App/App';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

export default function Root({store, ...props}) {
  return (
    <Provider store={store}>
      <Router>
        <App {...props} />
      </Router>
    </Provider>
  );
}