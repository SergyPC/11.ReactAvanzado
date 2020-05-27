import React from 'react';
//import React, { useEffect, Component} from 'react';
//import logo from './logo.svg';
//import './css/reset.css';
// import './App.css';

// import {
//   BrowserRouter as Router,
//   Route,
//   Link,
//   Switch,
//   Redirect,
//   withRouter
// } from "react-router-dom";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Login from '../Login/login';
import Register from '../Register/register';
import AdsBoard from '../AdsBoard/adsBoard';
import Detail from '../Detail/detail';
import CreateAd from '../CreateAd/createAd';
import EditAd from '../EditAd/editAd';
//import Navbarr from './components/navbar';

//import api from './js/api.js';

function App() {

  return (
    <div className="App">
      {/* <header className="App-header"> */}
        {/* <!-- navbar --> */}
        {/* <nav id="navbar" class="app-navbar"> */}
          {/* <div class="navbar-logo"> */}
            {/* <a href="/" alt="GUAGUA POP">GUAGUA POP</a>
            <br /> */}
            {/* <h1>GUAGUAPOP</h1> */}
          {/* </div> */}
        {/* </nav> */}
        {/* <!-- navbar-end --> */}
        {/* <h1>GuaGuaPop</h1> */}
      {/* </header> */}
      
      <main>
      <section id="detailSection" className="detail-section">
        <Router>
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route exact path="/editAd/id=:_id" component={EditAd} />
            <Route exact path="/adsBoard/:_id" component={Detail} />
            <Route path="/adsBoard" component={AdsBoard} />
            <Route path="/createAd" component={CreateAd} />
            <Redirect to="/adsBoard" />
          </Switch>
        </Router>

        
      </section>
      </main>
    </div>
  );
}

export default App;
