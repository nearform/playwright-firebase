import useAuth from './hooks/useAuth'
import './App.css'
function App() {
  const { user, login, logout } = useAuth()
  const buttonText = !user ? 'Log in' : 'Log out'
  const handleLoginOut = () => {
    if (user) {
      logout()
      return
    }
    login()
  }
  return (
    <>
      <h1>Welcome!</h1>
      <h3>
        This is an example React application to help you see the{' '}
        <a href={'https://www.npmjs.com/package/@nearform/playwright-firebase'}>
          @nearform/playwright-firebase
        </a>{' '}
        plugin in action
      </h3>
      <h2>Pre-requisites</h2>
      <p>
        If you're unfamiliar with Firebase please read{' '}
        <a href={'https://firebase.google.com/docs/auth/web/start'}>
          the documentation
        </a>{' '}
        on using Firebase SDK. You can find additional information on the README{' '}
        <a href={'https://github.com/nearform/playwright-firebase'}>here</a>.{' '}
        <br />
        <br />
        You'll need to populate you .env file with your
        <ul>
          <li>
            <a
              href={
                'https://firebase.google.com/docs/app-distribution/authenticate-service-account'
              }
            >
              Firebase Service Account
            </a>
          </li>
          <li>
            <a href={'https://firebase.google.com/docs/auth/web/manage-users'}>
              Firebase User ID (UID){' '}
            </a>
          </li>
          <li>
            <a
              href={
                'https://support.google.com/firebase/answer/7015592?hl=en#zippy=%2Cin-this-article'
              }
            >
              Firebase Configurations
            </a>
          </li>
        </ul>
        * Follow the instructions on the UID related to navigating to the
        Firebase console.
      </p>
      <p>
        Below we have some text that either shows the users displayed name, or
        "Logged out" depending on whether you've logged in with the button below
      </p>
      <br />
      <p>Try logging in! It will open a popup to sign in with Google.</p>
      <div className="user-input">
        <p className="username">
          {user ? user.displayName : 'You are logged out'}
        </p>
        <button onClick={handleLoginOut}>{buttonText}</button>
      </div>
      <br />
    </>
  )
}

export default App
