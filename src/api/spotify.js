import Spotify from 'spotify-web-api-node'
require('dotenv').config()
// credentials are optionale
export default new Spotify({
  clientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
  clientSecret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET,
  redirectUri: 'http://localhost:3000/callback'
})