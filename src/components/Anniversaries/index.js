import React from 'react'
import ReactDOM from 'react-dom'
import animateScrollTo from 'animated-scroll-to'
import Radium from 'radium'

import Spotify from '../../api/spotify'
import Album from './Album'

class Anniversaries extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      albums: [],
      loaded: false,
      statusMessage: 'Retrieving your music.',
      showTomorrow: false
    }
  }

  componentDidMount() {
    // ui
    this.loadingMessageInterval = setInterval(() => {
      this.setState({ statusMessage: this.state.statusMessage + '.' })
    }, 1000)

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

              this.setState({ statusMessage: 'Getting album release info.' })

              // spotify api only allows you to request 20 albums a at time, so we're creating a chunked array to iterate ver
              let chunkedAlbumIds = []
              const chunk = 20
              for (let i = 0, j = albumIds.length, step = 0; i < j; i += chunk, step++) {
                chunkedAlbumIds[step] = albumIds.slice(i, i + chunk)
              }

              Promise.all(chunkedAlbumIds.map(ids => Spotify.getAlbums(ids)))
                .then(chunks => {
                  albums = chunks.reduce((detailedAlbums, chunk) => { return [...chunk.body.albums, ...detailedAlbums] }, [])

                  // stop adding periods
                  clearInterval(this.loadingMessageInterval)
                  this.setState({ statusMessage: 'Finished getting your music.', loaded: true })

                  resolve(albums)
                }).catch(error => {
                  reject(error)
                })
            }
          }, err => {
            this.setState({ statusMessage: 'There was a problem getting your music. Try again by refreshing the page.' })
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

  anniversariesTomorrow() {
    let date = new Date()
    date.setDate(date.getDate() + 1)
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

  showTomorrowsAnniversaries() {
    this.setState({
      showTomorrow: true
    }, () => {
      animateScrollTo(ReactDOM.findDOMNode(this.tomorrowsContainer).offsetTop)
    })
  }

  render() {

    const styles = {
      container: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column'
      },
      message: {
        fontSize: '36px',
        fontWeight: 400
      },
      header: {
        fontSize: '60px',
        fontWeight: 600,
        textAlign: 'center',
        margin: '40px 0'
      },
      endMessage: {
        fontSize: '30px',
        fontWeight: 400,
        textAlign: 'center',
        margin: '40px 0'
      },
      endMessageClickable: {
        fontSize: '30px',
        fontWeight: 400,
        textAlign: 'center',
        margin: '40px 0',
        cursor: 'pointer',
        ':hover': {
          textDecoration: 'underline'
        }
      },
      anniversariesContainer: {
        display: 'flex-item',
        position: 'relative',
        width: '100%'
      },
      albumsContainer: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }
    }

    if (this.state.loaded) {
      let albumsToday = this.anniversariesToday()
      let albumsTommorrow = this.anniversariesTomorrow()

      const tomorrowsAnniversaries = this.state.showTomorrow && (
        <div ref={ el => this.tomorrowsContainer = el } style={styles.anniversariesContainer}>
          <div style={styles.albumsContainer}>
            {albumsTommorrow.length > 0 ? albumsTommorrow.map(album => <Album key={album.id} album={album} />) : <span style={styles.message}>No Anniversaries tomorrow.</span>}
          </div>
          <div style={styles.endMessage}>...come again tomorrow!</div>
        </div>
      )

      return (
        <div style={styles.container}>
          <div style={styles.header}>Anniversaries today!</div>
          <div style={styles.anniversariesContainer}>
            <div style={styles.albumsContainer}>
              {albumsToday.length > 0 ? albumsToday.map(album => <Album key={album.id} album={album} />) : <span style={styles.message}>No Anniversaries today!</span>}
            </div>
          </div>
          <div key="tomorrow-anniversary" onClick={this.showTomorrowsAnniversaries.bind(this)} style={this.state.showTomorrow ? styles.endMessage : styles.endMessageClickable}>{!this.state.showTomorrow ? 'Click here to check tomorrows anniversaries...' : 'Tomorrow\'s anniversaries!' }</div>
          {tomorrowsAnniversaries}
        </div>
      )
    } else {
      styles.container.justifyContent = 'center'
      styles.container.alignItems = 'center'
      styles.container.height = '100%'
      return (
        <div style={styles.container}>
          <span style={styles.message}>{this.state.statusMessage}</span>
        </div>
      )
    }
  }
}

export default Radium(Anniversaries)