import logo from './logo.svg';
import './App.css';
import { initializeApp } from 'firebase/app';
import { signInWithPopup, GoogleAuthProvider, getAuth, signOut } from 'firebase/auth';
import { useState, useEffect } from 'react'
initializeApp(JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG))
const provider = new GoogleAuthProvider()
function App() {
  const auth = getAuth()
  const [user, setUser] = useState(null)
  const handleSignIn = () => {
    signInWithPopup(auth, provider).then((result) => {
      setUser(result.user)
    })
  }
  const handleSignOut = () => {
    signOut(auth)
    setUser(null)

  }
  useEffect(
    () =>
      getAuth().onAuthStateChanged(async user => {
        if (user) {
          setUser(user)
        } else {
          setUser(null)
        }
      }),
    []
  )
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <button onClick={handleSignIn}>Sign in here</button>
        <button onClick={handleSignOut}>Sign out here</button>
        {user ? <p >Welcome! You are now logged in</p> : ''}
        Learn React
      </header>
    </div >
  );
}

export default App;
