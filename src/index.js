import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Spotify from './api/spotify'
import './index.css'
import App from './components/App'
import Index from './components/Index'
import registerServiceWorker from './registerServiceWorker'

const IndexRouter = () => (
  <Router>
    <App>
      <Route path="/" component={Index} />
      <Route path="/auth" component={() => {
        window.location = Spotify.createAuthorizeURL(['user-library-read', 'user-read-private', 'user-read-email'], 'auth')
        return <div />
      }} />
    </App>
  </Router>
)

ReactDOM.render(<IndexRouter />, document.getElementById('root'))
registerServiceWorker()
