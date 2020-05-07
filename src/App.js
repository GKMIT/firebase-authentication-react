import React from 'react';
import { auth, googleAuthProvider, facebookAuthProvider } from "./firebase";

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      emailVerified: false,
      displayName: '',
      email: '',
      phoneNumber: '',
    }
  }

  componentWillMount() {
    auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        console.log(userAuth)
        this.setState({
          emailVerified: userAuth.emailVerified,
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
    const { emailVerified, displayName, email, phoneNumber } = this.state
    return (
      <React.Fragment>
        <h1>Login</h1>

        <ul>
          {displayName && <li>Name: {displayName}</li>}
          {email && <li>Email: {email}</li>}
          {phoneNumber && <li>Phone Number: {phoneNumber}</li>}
        </ul>

        {!emailVerified && <button type="button" onClick={() => this.login('google')}>Login with google</button>}
        {!emailVerified && <button type="button" onClick={() => this.login('facebook')}>Login with facebook</button>}
        {emailVerified && <button type="button" onClick={() => this.logout()}>Logout</button>}
      </React.Fragment>
    )
  }
}

export default App;
