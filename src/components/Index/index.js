import React from 'react'
import { Link } from 'react-router-dom'

import Spotify from '../../api/spotify'
import logo from '../../static/logo.svg'
import cake from '../../static/cake.svg'

export default class Index extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      albums: []
    }
  }

  getAllAlbums() {
    return new Promise((resolve, reject) => {
      let albums = []
      let tracks = []
      let pageSize = 50

      const getAlbums = (offset) => {
        Spotify.getMySavedTracks({ offset: offset, limit: pageSize })
          .then(data => {
            let newTracks = data.body.items.map(item => item.track)
            
            if (newTracks.length > 0) {
              tracks = [...tracks, ...newTracks]
              getAlbums(offset + pageSize)
            } else {
              let existingAlbums = {}
              albums = tracks.reduce((existing, track) => {
                if (!existingAlbums[track.album.id]) {
                  existingAlbums[track.album.id] = true
                  existing.push(track.album)
                }

                return existing
              }, [])
              console.log(albums)
              resolve(albums)
              console.log('Done!');
            }
          }, err => {
            console.log('Something went wrong!', err);
          });
      }
      
      // start grabbing
      getAlbums(0)
    })
  }

  componentDidMount() {
    if (this.props.location.pathname === "/callback") {
      let accessToken = localStorage.getItem('access_token')
      let expiration = parseInt(localStorage.getItem('access_token_expiration'), 10)

      if (accessToken && !Number.isNaN(expiration) && accessToken !== "undefined" && expiration > (Date.now() / 1000)) {
        Spotify.setAccessToken(accessToken)
        this.getAllAlbums().then(albums => {
          this.setState({ albums })
        })
      } else {
        fetch('http://localhost:3001/getAuth?code=' + this.props.location.search.split('&')[0].replace('?code=', ''))
          .then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(res => {
            localStorage.setItem('access_token', res.access_token)
            localStorage.setItem('access_token_expiration', (Date.now() / 1000) + 3600)

            Spotify.setAccessToken(res.access_token)
            this.getAllAlbums().then(albums => {
              this.setState({ albums })
            })
          })
      }

    }
  }

  render() {
    const styles = {
      backgroundImage: {
        position: 'absolute',
        top: '-40%',
        left: '-50%',
        opacity: 0.2,
        zIndex: -1
      },
      prompt: {
        marginTop: '200px',
        marginLeft: '100px'
      },
      button: {
        display: 'block',
        width: '250px',
        padding: '20px 30px',
        fontSize: '16px',
        borderRadius: '40px',
        textTransform: 'uppercase',
        color: '#fff',
        textAlign: 'center',
        fontWeight: 600,
        backgroundColor: '#1db954',
        cursor: 'pointer',
        textDecoration: 'none'
      },
      header: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: '60px',
        lineHeight: '45px'
      },
      desc: {
        color: '#000',
        fontSize: '14px',
        lineHeight: '50px'
      }
    }

    return (
      <div>
        <img style={ styles.backgroundImage } src={ cake } />
        <div style={ styles.prompt }>
          <div style={ styles.header }>Welcome to Music Anniversary!</div>
          <div style={ styles.desc }>This app is used to see albums/singles that have hit their anniversary date.</div>
          <Link style={ styles.button } to="/auth">Login to Spotify</Link>
        </div>
        {this.state.albums.map(album => <img style={ { display: 'inline-block' } } alt={album.name} key={album.id} src={album.images[0].url} />)}
      </div>
    )
  }

}