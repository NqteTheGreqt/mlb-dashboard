import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";

const Login = (props) => {

  const [ user, setUser ] = useState({}); 

  function handleSignOut(e) {
    setUser({});
    props.logoutAction();
  }

  useEffect(() => {
    
    function handleCallbackResponse(response) {
      console.log(`Encoded JWT ID token: ${response.credential}`);
      let userObject = jwt_decode(response.credential);
      setUser(userObject);
      localStorage.setItem('user', userObject.email);
      props.loginAction();
    }

    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
    );
  }, [props]);

  return (
    <div className="container">
      { !props.loggedIn &&
        <div id="signInDiv"></div>
      }
      { props.loggedIn &&
        <button onClick={ (e) => handleSignOut(e)}>Sign Out</button>
      }
      { props.loggedIn &&
        <div>
          <img src={user.picture} alt="profile"></img>
          <h3>{user.name}</h3>
          <p>{console.log(Object.keys(user))}</p>
        </div>
      }
    </div>
  );
}

export default Login;