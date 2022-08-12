const { App } = require("@slack/bolt");


const app = new App({
    token: "INSERT YOUR BOT USER OAUTH TOKEN", //Find in the Oauth  & Permissions tab
    signingSecret: "INSERT SIGNING SECRET", // Find in Basic Information Tab
    socketMode:true,
    appToken: "INSERT SOCKET TOKEN" // Token from the App-level Token that we created
});


app.start(3000)