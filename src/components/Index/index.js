import React from 'react'
import { Link } from 'react-router-dom'

import Spotify from '../../api/spotify'
import logo from '../../static/logo.svg'
import cake from '../../static/cake.svg'

import AlbumMatrix from '../AlbumMatrix'

export default class Index extends React.Component {

  render() {
    const styles = {
      container: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 100px'
      },
      backgroundImage: {
        position: 'absolute',
        top: '-20%',
        left: '-20%',
        width: '60%',
        display: 'block',
        opacity: 0.2,
        zIndex: 0
      },
      prompt: {
        width: '50%',
        zIndex: 1
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
        lineHeight: '54px'
      },
      desc: {
        color: '#000',
        fontSize: '18px',
        lineHeight: '80px'
      },
      albumMatrix: {
        width: '50%'
      }
    }

    return (
      <div style={styles.container}>
        <img style={styles.backgroundImage} src={cake} />
        <div style={styles.prompt}>
          <div style={styles.header}>Welcome to Music Anniversary!</div>
          <div style={styles.desc}>See the upcoming anniversary dates for music that you listen to on Spotify.</div>
          <Link style={{ ...styles.button, marginTop: '10px' }} to="/auth">Login to Spotify</Link>
        </div>
        <AlbumMatrix style={styles.albumMatrix} />
      </div>
    )
  }

}