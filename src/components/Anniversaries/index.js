import React from 'react'

import Spotify from '../../api/spotify'
import Image from '../Image'

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
              let albumIds = tracks.reduce((existing, track) => {
                if (!existingAlbums[track.album.id]) {
                  existingAlbums[track.album.id] = true
                  existing.push(track.album.id)
                }

                return existing
              }, [])

              // spotify api only allows you to request 20 albums a at time, so we're creating a chunked array to iterate ver
              let chunkedAlbumIds = []
              const chunk = 20
              for (let i = 0, j = albumIds.length, step = 0; i < j; i += chunk, step++) {
                chunkedAlbumIds[step] = albumIds.slice(i, i + chunk)
              }

              Promise.all(chunkedAlbumIds.map(ids => Spotify.getAlbums(ids)))
                .then(chunks => {
                  albums = chunks.reduce((detailedAlbums, chunk) => { return [...chunk.body.albums, ...detailedAlbums] }, [])
                  resolve(albums)
                  console.log('Done!')
                }).catch(error => {
                  reject(error)
                })
            }
          }, err => {
            console.log('Something went wrong!', err)
          });
      }

      // start grabbing
      getAlbums(0)
    })
  }

  albumsGroupedBy(groupings) {
    let albums = this.state.albums

    if (groupings.indexOf('day') > -1) {
      albums = albums.filter(album => album.release_date_precision === 'day')
    } else if (groupings.indexOf('month') > -1) {
      albums = albums.filter(album => album.release_date_precision === 'month' || album.release_date_precision === 'day')
    }

    const groupingIndexes = { 'year': 0, 'month': 1, 'day': 2 }
    let groups = {}

    albums.forEach(album => {
      let dateComponents = album.release_date.split('-')
      let key = groupings.map(grouping => `${grouping}:${dateComponents[groupingIndexes[grouping]]}`).join('')
      if (!groups[key]) {
        groups[key] = []
      }
      groups[key].push(album)
    })

    return groups
  }

  anniversariesToday() {
    let date = new Date()
    let day = date.getDate() // 1-31
    let month = date.getMonth() + 1 // 1-12

    if (day < 10) day = '0' + day
    if (month < 10) month = '0' + month

    return this.albumsGroupedBy(['month', 'day'])[`month:${month}day:${day}`] || []
  }

  anniversariesThisMonth() {
    let date = new Date()
    let month = date.getMonth() + 1 // 1-12

    if (month < 10) month = '0' + month

    return this.albumsGroupedBy(['month'])[`month:${month}`] || []
  }

  render() {
    const albumsToday = this.anniversariesToday()
    const albumsThisMonth = this.anniversariesThisMonth()

    return (
      <div>
        <h1>Anniversaries Today</h1>
        {
          albumsToday.length > 0 ? albumsToday.map(album => <Album album={ album } />) : <div>No anniversaries today!</div>
        }
        <h1>Anniversaries this Month</h1>
        {
          albumsThisMonth.length > 0 ? albumsThisMonth.map(album => <Album album={ album } />) : <div>No anniversaries this month!</div>
        }
      </div>
    )
  }
}

const Album = props => {
  let album = props.album

  let date = new Date()
  let year = date.getFullYear()
  let releaseYear = parseInt(album.release_date.split('-')[0], 10)
  let age = year - releaseYear

  return (
    <div key={album.id} style={{ display: 'inline-block' }}>
      <Image alt={album.name} key={album.id} src={album.images[1].url} />
      <div>{ age } year{ age > 1 ? 's' : '' } old</div>
    </div>
  )
}
