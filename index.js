const { App } = require("@slack/bolt");
require('dotenv').config({ path: require('find-config')('.env') })
const axios = require('axios')

const app = new App({
    token: process.env.token, //Find in the Oauth  & Permissions tab
    signingSecret: process.env.singingSecret, // Find in Basic Information Tab
    socketMode:true,
    appToken: process.env.SLACK_APP_TOKEN // Token from the App-level Token that we created
});

app.command("/send", async ({ command, ack, say }) => {
    try {
      await ack();
      let txt = command.text // The inputted parameters

      // axios api call to handwritting api
    //   var data = JSON.stringify({
    //     "handwriting_style": 12,
    //     "message": req.body.message,
    //     "recipients": [
    //       {
    //         "name": req.body.name,
    //         "address": req.body.street,
    //         "city": req.body.city,
    //         "province": req.body.state,
    //         "postal_code": req.body.postal,
    //         "country": req.body.country
    //       }
    //     ]
    //   });
      
    //   var config = {
    //     method: 'post',
    //     url: 'https://api.thanks.io/api/v2/send/notecard',
    //     headers: { 
    //       'Content-Type': 'application/json',
    //       'Authorization': 'Bearer '+ process.env.bundleToken
    //     },
    //     data : data
    //   };
      
    //   axios(config)
    //   .then(function (response) {
    //     console.log('post card response' + JSON.stringify(response.data));
    //     res.send(JSON.stringify(response.data))
    //   })
    //   .catch(function (error) {
    //     console.log('postcard send error' + error);
    //     res.send(error);
    //   });



      // next section
      if(isNaN(txt)) {
          say(txt + " is not a number")
      } else {
          say(txt + " squared = " + (parseFloat(txt) * parseFloat(txt)))
      }
    } catch (error) {
      console.log("err")
      console.error(error);
    }
});

app.message(/^(hi|hello|hey).*/, async ({ context, say }) => {
    // RegExp matches are inside of context.matches
    const greeting = context.matches[0];
  
    await say(`${greeting}, how are you?`);
  });


app.start(3000)