import React from 'react'

import Spotify from '../../api/spotify'

export default class Anniversaries extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      albums: []
    }
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('access_token')
    let expiration = parseInt(localStorage.getItem('access_token_expiration'), 10)
    
    if (accessToken && !Number.isNaN(expiration) && accessToken !== "undefined" && expiration > (Date.now() / 1000)) {
      Spotify.setAccessToken(accessToken)
      this.getAllAlbums().then(albums => {
        this.setState({ albums })
      })
    } else {
      window.location = '/'
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


  render() {
    return (
      <div>
        {this.state.albums.map(album => <img style={ { display: 'inline-block' } } alt={album.name} key={album.id} src={album.images[0].url} />)}
      </div>
    )
  }
}
