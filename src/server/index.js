require('dotenv').config()

const express = require('express')
import Spotify from '../api/spotify'

const app = express()

app.all('/*', (req, res, next) => {
  const allowedOrigins = ['http://localhost:3000', 'http://musicanniversary.com']
  const origin = req.headers.origin

  if (allowedOrigins.indexOf(origin) > -1) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header("Access-Control-Allow-Headers", "X-Requested-With")
  next()
})

app.get('/api/getAuth', (req, res) => {

  res.setHeader('Content-Type', 'application/json')

  Spotify.authorizationCodeGrant(req.query.code)
    .then(data => {
      console.log('The token expires in ' + data.body['expires_in']);
      console.log('The access token is ' + data.body['access_token']);
      console.log('The refresh token is ' + data.body['refresh_token']);
      console.log(data.body)
      // Set the access token on the API object to use it in later calls
      Spotify.setAccessToken(data.body['access_token']);
      Spotify.setRefreshToken(data.body['refresh_token']);

      res.send(JSON.stringify({ access_token: data.body['access_token'] }))

    }, err => {
      console.log('Something went wrong!', err)
      res.send(JSON.stringify({ error: err }))
    })
})

app.listen(3001, () => console.log('Started listening on port 3001!'))