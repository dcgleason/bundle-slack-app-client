const { App } = require("@slack/bolt");
require('dotenv').config({ path: require('find-config')('.env') })
const axios = require('axios')

const app = new App({
    token: process.env.token, //Find in the Oauth  & Permissions tab
    signingSecret: process.env.singingSecret, // Find in Basic Information Tab
    socketMode:false,
    appToken: process.env.SLACK_APP_TOKEN // Token from the App-level Token that we created
});



app.shortcut("/send_letter", async ({ command, ack, say }) => {
    try {
        await ack();
        say("Hello, this is a test.")
        console.log('console.logging test');
        } catch (error) {
            console.log("err")
            logger.error(error);

    }

});


// The echo command simply echoes on command
app.command('/echo', async ({ command, ack, respond }) => {
    // Acknowledge command request
    await ack();
  
    await respond(`${command.text}`);
  });

app.start(3000)