import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'

import './index.css'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'

const Index = () => (
  <Router>
    <div>
      <Route exact path="/" component={ App } />
      <Route path="/auth" component={ () => { window.location = `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&scope=${encodeURIComponent('user-library-read')}&redirect_uri=${encodeURIComponent('http://localhost:3000')}` } } />
    </div>
  </Router>
)

ReactDOM.render(<Index />, document.getElementById('root'))
registerServiceWorker()
