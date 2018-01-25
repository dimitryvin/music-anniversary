import Spotify from 'node-spotify-api'

export default new Spotify({
    id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
    secret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET
})