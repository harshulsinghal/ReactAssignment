import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import './App.css';
import Navbar from './Navbar';
import RegisterComponent from './Register';
import LoginComponent from './Login';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/dashboard"></Redirect>} />
          <Route exact path="/register" component={RegisterComponent} />
          <Route exact path="/login" component={LoginComponent} />
        </Switch>
      </div>
    </Router >
  );
}

export default App;
