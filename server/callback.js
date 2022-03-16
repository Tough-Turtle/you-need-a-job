const express = require('express');
const router = express.Router();
const request = require('superagent');

 
router.get('/', function (req,res,next) {
  console.log('req query code: ', req.query.code)
  requestAccessToken(req.query.code,req.query.state)
  .then((response) => {
    requestProfile(response.body.access_token)
    .then(response => {
      console.log('=========> res.body', response.body)
      // res.body.locals.token = 
      // res.render('callback', { profile: response.body });
      // res.render('callback', { profile: response.body });
      res.locals.lastName = response.body.localizedLastName;
      res.redirect(`http://localhost:8080/?user=${res.locals.lastName}`);
    })
  })
  .catch((error) => {
    // res.status(500).send(`${error}`)
    res.status(500).send(`TEST MESSAGE TO DISPLAY`);
    console.error('===========> ERROR!!!!!!!!!!',error)
  })
})

function requestAccessToken(code,state) {
    console.log('========= IN REQUEST ACCESS TOKEN');
    return request.post('https://www.linkedin.com/oauth/v2/accessToken')
      .send('grant_type=authorization_code')
      .send(`redirect_uri=http://localhost:3001/callback`)
      // .send(`redirect_uri=${process.env.EXPRESS_APP_REDIRECT_URI}`)
      .send(`client_id=`)
      .send(`client_secret=`)
      .send(`code=${code}`)
      .send(`state=${state}`)
}

function requestProfile(token) {
    return request.get('https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName,profilePicture(displayImage~digitalmediaAsset:playableStreams))')
    .set('Authorization', `Bearer ${token}`)
}

module.exports = router;