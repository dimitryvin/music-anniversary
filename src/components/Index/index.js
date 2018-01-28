import React from 'react'
import { Link } from 'react-router-dom'

import Spotify from '../../api/spotify'
import logo from '../../static/logo.svg'
import cake from '../../static/cake.svg'

import AlbumMatrix from '../AlbumMatrix'

export default class Index extends React.Component {

  render() {
    const styles = {
      backgroundImage: {
        position: 'absolute',
        top: '-60%',
        left: '-50%',
        opacity: 0.2,
        zIndex: -1
      },
      prompt: {
        position: 'absolute',
        width: '50%',
        left: '100px',
        top: '300px',
        boxSizing: 'border-box'
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
      },
      albumMatrix: {
        position: 'absolute',
        right: '100px',
        top: '200px',
        width: 'calc(50% - 200px)'
      }
    }

    return (
      <div>
        <img style={styles.backgroundImage} src={cake} />
        <div style={styles.prompt}>
          <div style={styles.header}>Welcome to Music Anniversary!</div>
          <div style={styles.desc}>This app is used to see albums/singles that have hit their anniversary date.</div>
          <Link style={styles.button} to="/auth">Login to Spotify</Link>
        </div>
        <AlbumMatrix style={styles.albumMatrix} />
      </div>
    )
  }

}