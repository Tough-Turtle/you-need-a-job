const express = require('express');
const router = express.Router();
const request = require('superagent');

 
router.get('/', function (req,res,next) {
    requestAccessToken(req.query.code,req.query.state)
  .then((response) => {
    requestProfile(response.body.access_token)
    .then(response => {
      console.log(response.body)
      res.render('callback', { profile: response.body});
    })
  })
  .catch((error) => {
    res.status(500).send(`${error}`)
    console.error(error)
  })
})

function requestAccessToken(code,state) {
    return request.post('https://www.linkedin.com/oauth/v2/accessToken')
      .send('grant_type=authorization_code')
      .send(`redirect_uri=http://localhost:8080`)
      // .send(`redirect_uri=${process.env.EXPRESS_APP_REDIRECT_URI}`)
      .send(`client_id=77q8nxwwnsqhni`)
      .send(`client_secret=iQmp5wgV1Tahi56g`)
      .send(`code=${code}`)
      .send(`state=${state}`)
}

function requestProfile(token) {
    return request.get('https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName,profilePicture(displayImage~digitalmediaAsset:playableStreams))')
    .set('Authorization', `Bearer ${token}`)
}

module.exports = router;