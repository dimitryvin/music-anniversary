import React from 'react'

const Auth = props => {
    let accessToken = localStorage.getItem('access_token')
    let expiration = parseInt(localStorage.getItem('access_token_expiration'), 10)

    if (accessToken && !Number.isNaN(expiration) && accessToken !== "undefined" && expiration > (Date.now() / 1000)) {
      window.location = '/anniversaries'
    } else {
      fetch('http://localhost:3001/getAuth?code=' + props.location.search.split('&')[0].replace('?code=', ''))
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(res => {
          localStorage.setItem('access_token', res.access_token)
          localStorage.setItem('access_token_expiration', (Date.now() / 1000) + 3600)

          window.location = '/anniversaries'
        })
    }

    return <span>Logging in</span>
}

export default Auth