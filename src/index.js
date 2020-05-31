import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './css/reset.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import App from './components/App/App';
// ReactDOM.render(<App />, document.getElementById('root'));

import Root from './components/Root/Root';
import { configureStore } from './store';

const store = configureStore();
ReactDOM.render(<Root store={store} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
