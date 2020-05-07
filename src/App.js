import React from 'react';
import { auth, googleAuthProvider, facebookAuthProvider } from "./firebase";

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      loggedIn: false,
      displayName: '',
      email: '',
      phoneNumber: '',
    }
  }

  componentWillMount() {
    auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        this.setState({
          loggedIn: true,
          displayName: userAuth.displayName,
          email: userAuth.email,
          phoneNumber: userAuth.phoneNumber,
        })
      }
    });
  }



  login = (type) => {
    if (type === 'facebook') {
      auth.signInWithPopup(facebookAuthProvider)
    } else {
      auth.signInWithPopup(googleAuthProvider)
    }
  }

  logout = () => {
    auth.signOut()
    window.location.reload()
  }

  render() {
    const { loggedIn, displayName, email, phoneNumber } = this.state
    return (
      <React.Fragment>
        <h1>Login</h1>

        <ul>
          {displayName && <li>Name: {displayName}</li>}
          {email && <li>Email: {email}</li>}
          {phoneNumber && <li>Phone Number: {phoneNumber}</li>}
        </ul>

        {!loggedIn && <button type="button" onClick={() => this.login('google')}>Login with google</button>}
        {!loggedIn && <button type="button" onClick={() => this.login('facebook')}>Login with facebook</button>}
        {loggedIn && <button type="button" onClick={() => this.logout()}>Logout</button>}
      </React.Fragment>
    )
  }
}

export default App;
