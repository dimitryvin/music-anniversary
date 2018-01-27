import React from 'react'

import Spotify from '../../api/spotify'
import logo from '../../static/logo.svg'

export default class Index extends React.Component {

  componentDidMount() {
    if (this.props.location.pathname === "/callback") {
      fetch('http://localhost:3001/getAuth?code=' + this.props.location.search.split('&')[0].replace('?code=', ''))
      .then(res => res.json())  
      .catch(error => console.error('Error:', error))
      .then(res => {
        Spotify.setAccessToken(res.access_token)
      })
    }
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    )
  }

}