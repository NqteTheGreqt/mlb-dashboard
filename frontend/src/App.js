import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import GoogleLogin from 'react-google-login'
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";


import Navbar from "./components/navbar.component"
import PlayersList from "./components/players-list.component"

function App() {
  
  const [ user, setUser ] = useState({});

  function handleCallbackResponse(response) {
    console.log(`Encoded JWT ID token: ${response.credential}`);
    let userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(e) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
    );
  }, []);

  return (
    <div className="container">
      <div id="signInDiv"></div>
      { Object.keys(user).length != 0 && 
        <button onClick={ (e) => handleSignOut(e)}>Sign Out</button>
      }
      { user &&
        <div>
          <img src={user.picture}></img>
          <h3>{user.name}</h3>
        </div>
      }
    </div>
  );
}

export default App;
