
import { initializeApp } from 'firebase/app';
import { signInWithPopup, GoogleAuthProvider, getAuth, signOut } from 'firebase/auth';
import { useState, useEffect } from 'react'
initializeApp(JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG))
const provider = new GoogleAuthProvider()
function App() {
  const auth = getAuth()
  const [user, setUser] = useState(auth.currentUser)
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
  useEffect(() => {
    console.log(user)
  }, [user])


  return (
    <div className="App">
      <button onClick={handleSignIn}>Sign in here</button>
      <button onClick={handleSignOut}>Sign out here</button>
      {user ? <p >Welcome! You are now logged in</p> : ''}
    </div >
  );
}

export default App;
