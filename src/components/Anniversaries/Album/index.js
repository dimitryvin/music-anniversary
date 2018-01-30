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

    const mediaQuery = '@media (max-width: 450px)'
    const styles = {
      container: {
        position: 'relative',
        margin: '20px',
        width: '300px',
        textAlign: 'left',
        borderRadius: '20px',
        backgroundColor: '#fff',
        boxShadow: '0px 0px 30px -7px rgba(65,64,66,0.5)',
        border: '1px solid #efefef'
      },
      albumPlaceholder: {
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px'
      },
      image: {
        position: 'absolute',
        top: 0,
        left: 0,
        display: 'block',
        minWidth: '300px',
        minHeight: '300px',
        width: '100%',
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px'
      },
      albumTitle: {
        fontWeight: 700,
        fontSize: '20px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '100%',
        marginBottom: '10px',
        whiteSpace: 'nowrap'
      },
      albumArtists: {
        fontWeight: 600,
        fontSize: '16px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '100%',
        marginBottom: '3px',
        whiteSpace: 'nowrap',
        color: '#545454'
      },
      albumAge: {
        opacity: 1,
        display: 'inline-block',
        textTransform: 'uppercase',
        color: '#1db954',
        border: '1px solid #1db954',
        fontSize: '10px',
        padding: '5px',
        borderRadius: '4px'
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
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        ':hover': {
          opacity: 1
        },
        ':active': {
          opacity: 1
        }
      },
      playButton: {
        width: '50%',
        marginTop: '30px'
      },
      metadataContainer: {
        padding: '12px 12px 15px 12px',
        marginTop: '-6px'
      }
    }

    return (
      <div key={album.id} style={styles.container}>
        <img src={albumPlaceholder} style={styles.albumPlaceholder} />
        <Image alt={album.name} key={album.id} src={album.images[1].url} style={styles.image} />
        <div style={styles.playContainer} onClick={this.openSpotifyLink.bind(this)}>
          <img src={playButton} style={styles.playButton} />
        </div>
        <div style={styles.metadataContainer}>
          <div style={styles.albumArtists}>{album.artists.map(artist => artist.name).join(', ')}</div>
          <div style={styles.albumTitle}>{album.name}</div>
          <div style={styles.albumAge}>{age} year{age > 1 ? 's' : ''} old</div>
        </div>
        <div style={styles.albumType}>{album.album_type}</div>
      </div>
    )
  }
}

export default Radium(Album)