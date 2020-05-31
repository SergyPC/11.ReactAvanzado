import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from '../PrivateRoute/PrivateRoute'
import Login from '../Login';
import Register from '../Register/register';
import AdsBoard from '../AdsBoard';
import Detail from '../Detail/detail';
import CreateAd from '../CreateAd/createAd';
import EditAd from '../EditAd/editAd';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if(this.props.isLogged) {
      this.loadTags();
    };
  }
 
  loadAds() {
    this.props.loadAds();
  }

  loadTags() {
    this.props.loadTags()
  }
 
  render () {
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
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <PrivateRoute exact path="/editAd/id=:_id" component={EditAd} />
                <PrivateRoute exact path="/adsBoard/:_id" component={Detail} />
                <PrivateRoute path="/adsBoard" component={AdsBoard} />
                <PrivateRoute path="/createAd" component={CreateAd} />
                <Redirect to="/login" />
                {/* <Redirect to="/adsBoard" /> */}
                {/* Podríamos redirigir a una página de error */}
              </Switch>
            </Router>
          </section>
        </main>
      </div>
    );
  }
}

export default App;
