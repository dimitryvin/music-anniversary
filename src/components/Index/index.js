import React from 'react'

import Spotify from '../../api/spotify'
import logo from '../../static/logo.svg'

export default class Index extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      albums: []
    }
  }

  getAlbums() {
    Spotify.getMySavedAlbums()
    .then(data => {
      console.log(data)

      let albums = data.body.items.map(item => item.album)
      this.setState({ 
        albums
      })
      console.log('Done!');
    }, err => {
      console.log('Something went wrong!', err);
    });
  }

  componentDidMount() {
    if (this.props.location.pathname === "/callback") {
      let accessToken = localStorage.getItem('access_token')
      
      if (accessToken && accessToken !== "undefined") {
        Spotify.setAccessToken(accessToken)
        this.getAlbums()
      } else {
        fetch('http://localhost:3001/getAuth?code=' + this.props.location.search.split('&')[0].replace('?code=', ''))
        .then(res => res.json())  
        .catch(error => console.error('Error:', error))
        .then(res => {
          localStorage.setItem('access_token', res.access_token)
          Spotify.setAccessToken(res.access_token)
          this.getAlbums()
        })
      }

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
          { this.state.albums.map(album => <img alt={ album.name } key={ album.id } src={ album.images[0].url } />) }
        </p>
      </div>
    )
  }

}