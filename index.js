const { App } = require("@slack/bolt");
require('dotenv').config({ path: require('find-config')('.env') })

const app = new App({
    token: process.env.token, //Find in the Oauth  & Permissions tab
    signingSecret: process.env.singingSecret, // Find in Basic Information Tab
    socketMode:true,
    appToken: process.env.appToken // Token from the App-level Token that we created
});


app.start(3000)