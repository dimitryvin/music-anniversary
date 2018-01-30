import React from 'react'
import Radium from 'radium'
import { Link } from 'react-router-dom'

import Spotify from '../../api/spotify'
import cake from '../../static/cake.svg'

import AlbumMatrix from '../AlbumMatrix'

const RLink = Radium(Link)

class Index extends React.Component {

  render() {
    const mediaQuery = '@media (max-width: 800px)'
    const styles = {
      container: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 100px',
        [mediaQuery]: {
          flexDirection: 'column-reverse',
          justifyContent: 'flex-end',
          margin: 0
        }
      },
      backgroundImage: {
        position: 'absolute',
        top: '-20%',
        left: '-20%',
        width: '60%',
        display: 'block',
        opacity: 0.2,
        zIndex: 0,
        [mediaQuery]: {
          display: 'none'
        }
      },
      prompt: {
        width: '50%',
        paddingRight: '20px',
        [mediaQuery]: {
          width: '100%',
          marginTop: '30px',
          textAlign: 'center',
          display: 'flex',
          padding: 0,
          flexDirection: 'column',
          alignItems: 'center'
        }
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
        textDecoration: 'none',
        transition: 'background-color 0.3s ease',
        ':hover': {
          backgroundColor: '#41cc71'
        },
        ':active': {
          backgroundColor: '#18a349'
        },
        [mediaQuery]: {
          marginTop: '20px'
        }
      },
      header: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: '60px',
        lineHeight: '54px',
        [mediaQuery]: {
          fontSize: '36px',
          lineHeight: '36px'
        }
      },
      desc: {
        color: '#000',
        fontSize: '18px',
        margin: '20px 0 25px 0',
        [mediaQuery]: {
          fontSize: '16px',
          lineHeight: '20px',
          margin: '10px 10px'
        }
      },
      albumMatrix: {
        width: '50%',
        [mediaQuery]: {
          width: '100%',
          zIndex: 0
        }
      }
    }

    return (
      <div style={styles.container}>
        <img style={styles.backgroundImage} src={cake} />
        <div style={styles.prompt}>
          <div style={styles.header}>Welcome to Music Anniversary!</div>
          <div style={styles.desc}>See the upcoming anniversary dates for music that you listen to on Spotify.</div>
          <RLink style={styles.button} to="/auth">Login to Spotify</RLink>
        </div>
        <AlbumMatrix style={styles.albumMatrix} />
      </div>
    )
  }
}

export default Radium(Index)