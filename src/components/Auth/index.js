import React from 'react'

class Auth extends React.Component {

  componentDidMount() {
    let accessToken = localStorage.getItem('access_token')
    let expiration = parseInt(localStorage.getItem('access_token_expiration'), 10)

    if (accessToken && !Number.isNaN(expiration) && accessToken !== "undefined" && expiration > (Date.now() / 1000)) {
      window.location = '/anniversaries'
    } else {
      fetch(process.env.REACT_APP_API_URL + '/api/getAuth?code=' + this.props.location.search.split('&')[0].replace('?code=', ''))
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(res => {
          localStorage.setItem('access_token', res.access_token)
          localStorage.setItem('access_token_expiration', (Date.now() / 1000) + 3600)

          window.location = '/anniversaries'
        })
    }

    setInterval(() => {
      this.msg.textContent += '.'
    }, 1000)
  }

  render() {
    const styles = {
      container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
      },
      message: {
        fontWeight: 400,
        fontSize: '36px'
      }
    }

    return (
      <div style={styles.container}>
        <span style={styles.message} ref={msg => this.msg = msg}>Logging in.</span>
      </div>
    )
  }
}

export default Auth