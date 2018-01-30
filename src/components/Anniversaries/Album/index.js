import React from 'react'
import Radium from 'radium'

import Image from '../../Image'
import albumPlaceholder from '../../../static/albumPlaceholder.png'
import playButton from '../../../static/play.svg'

class Album extends React.Component {

  openSpotifyLink() {
    window.open(this.props.album.external_urls.spotify)
  }

  render() {
    let album = this.props.album

    let date = new Date()
    let year = date.getFullYear()
    let releaseYear = parseInt(album.release_date.split('-')[0], 10)
    let age = year - releaseYear

    const styles = {
      container: {
        position: 'relative',
        textAlign: 'center',
        margin: '20px',
        width: '300px'
      },
      albumPlaceholder: {
        position: 'absolute',
        top: 0,
        left: 0
      },
      image: {
        position: 'absolute',
        top: 0,
        left: 0,
        display: 'block',
        minWidth: '300px',
        minHeight: '300px',
        width: '100%',
        boxShadow: '0px 0px 30px -7px rgba(65,64,66,0.5)'
      },
      albumTitle: {
        fontWeight: 600,
        fontSize: '20px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '100%',
        margin: '10px 0 5px 0',
        whiteSpace: 'nowrap'
      },
      albumArtists: {
        fontWeight: 400,
        fontSize: '14px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '100%',
        marginBottom: '10px',
        whiteSpace: 'nowrap'
      },
      albumAge: {
        fontSize: '16px',
        opacity: 0.8
      },
      albumType: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        padding: '5px 15px',
        borderRadius: '12.5px',
        fontSize: '10px',
        color: '#f2f2f2',
        border: '1px solid #f2f2f2',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        textTransform: 'uppercase'
      },
      playContainer: {
        position: 'absolute',
        top: 0, 
        left: 0,
        width: '300px',
        height: '300px',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        transition: 'opacity 0.3s ease',
        opacity: 0,
        ':hover': {
          opacity: 1
        }
      },
      playButton: {
        width: '50%',
        marginTop: '30px'
      }
    }

    return (
      <div key={album.id} style={styles.container}>
        <img src={albumPlaceholder} styles={styles.albumPlaceholder} />
        <Image alt={album.name} key={album.id} src={album.images[1].url} style={styles.image} />
        <div style={ styles.playContainer } onClick={ this.openSpotifyLink.bind(this) }>
          <img src={playButton} style={styles.playButton} />
        </div>
        <div style={styles.albumTitle}>{album.name}</div>
        <div style={styles.albumArtists}>{album.artists.map(artist => artist.name).join(', ')}</div>
        <div style={styles.albumAge}>{age} year{age > 1 ? 's' : ''} old</div>
        <div style={styles.albumType}>{album.album_type}</div>
      </div>
    )
  }
}

export default Radium(Album)