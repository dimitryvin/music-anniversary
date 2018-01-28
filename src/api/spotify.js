import Spotify from 'spotify-web-api-node'
require('dotenv').config()

export default new Spotify({
  clientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
  clientSecret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.REACT_APP_API_URL + '/callback'
})