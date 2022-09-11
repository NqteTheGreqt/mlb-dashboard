import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import { Provider, connect } from "react-redux";

import Login from "./components/login.component";

import { loginAction } from "./actions/loginAction";
import { logoutAction } from "./actions/logoutAction";
import configureStore from "./store"

const mapStateToProps = (state) => {
  return {loggedIn: state.loggedIn}
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginAction: () => dispatch(loginAction),
    logoutAction: () => dispatch(logoutAction)
  } 
};

const Container = connect(mapStateToProps, mapDispatchToProps)(Login);

function App() {
  return (
    <Provider store={configureStore()}>
      <Container />
    </Provider>
  );
};

export default App;