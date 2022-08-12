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




app.start(3000)