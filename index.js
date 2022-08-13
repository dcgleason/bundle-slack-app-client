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
    
    try{

        await ack();

        const result = await client.views.open({
          trigger_id: req.body.trigger_id,
          view: {
            "type": "modal",
            "title": {
              "type": "plain_text",
              "text": "Bundle"
            },
            "close": {
              "type": "plain_text",
              "text": "Close"
            },
    
            "blocks": [
              {
                  "type": "input",
                  "element": {
                      "type": "plain_text_input",
                      "action_id": "plain_text_input-action"
                  },
                  "label": {
                      "type": "plain_text",
                      "text": "Recipient street address",
                      "emoji": true
                  }
              },
              {
                  "type": "input",
                  "element": {
                      "type": "plain_text_input",
                      "action_id": "plain_text_input-action"
                  },
                  "label": {
                      "type": "plain_text",
                      "text": "Recipient city",
                      "emoji": true
                  }
              },
              {
                  "type": "input",
                  "element": {
                      "type": "plain_text_input",
                      "action_id": "plain_text_input-action"
                  },
                  "label": {
                      "type": "plain_text",
                      "text": "Recipient state/province",
                      "emoji": true
                  }
              },
              {
                  "type": "input",
                  "element": {
                      "type": "plain_text_input",
                      "action_id": "plain_text_input-action"
                  },
                  "label": {
                      "type": "plain_text",
                      "text": "Recipient postal code",
                      "emoji": true
                  }
              },
              {
                  "type": "input",
                  "element": {
                      "type": "plain_text_input",
                      "action_id": "plain_text_input-action"
                  },
                  "label": {
                      "type": "plain_text",
                      "text": "Recipient country",
                      "emoji": true
                  }
              },
              {
                  "type": "input",
                  "element": {
                      "type": "plain_text_input",
                      "multiline": true,
                      "action_id": "plain_text_input-action"
                  },
                  "label": {
                      "type": "plain_text",
                      "text": "Your message",
                      "emoji": true
                  }
              },
              {
                  "type": "section",
                  "text": {
                      "type": "mrkdwn",
                      "text": "Click submit to send a letter (in the mail)"
                  },
                  "accessory": {
                      "type": "button",
                      "text": {
                          "type": "plain_text",
                          "text": "Submit",
                          "emoji": true
                      },
                      "value": "click_me_123",
                      "action_id": "button-action"
                  }
              }
          ]
          }
        });
    
        console.log(result);
    
      }
    catch {
      console.log('error while popping up the modal');
    }

});


// The echo command simply echoes on command
app.command('/echo', async ({ command, ack, respond }) => {
    // Acknowledge command request
    await ack();
  
    await respond(`${command.text}`);
  });

app.start(3000)