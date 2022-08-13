const { App } = require("@slack/bolt");
require('dotenv').config({ path: require('find-config')('.env') })
const axios = require('axios')

const app = new App({
    token: process.env.token, //Find in the Oauth  & Permissions tab
    signingSecret: process.env.singingSecret, // Find in Basic Information Tab
    socketMode:false,
    appToken: process.env.SLACK_APP_TOKEN // Token from the App-level Token that we created
});




app.shortcut("/send_letter", async ({ ack, payload, client }) => {
    
ack();
   try{


    const result = await client.views.open({
      trigger_id: payload.trigger_id,
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
              "block_id": "street_input",
              "element": {
                  "type": "plain_text_input",
                  "action_id": "plain_text_input-city"
              },
              "label": {
                  "type": "plain_text",
                  "text": "Recipient street address",
                  "emoji": true
              }
          },
          {
              "type": "input",
              "block_id": "city_input",
              "element": {
                  "type": "plain_text_input",
                  "action_id": "plain_text_input-city"
              },
              "label": {
                  "type": "plain_text",
                  "text": "Recipient city",
                  "emoji": true
              }
          },
          {
              "type": "input",
              "block_id": "state_input",
              "element": {
                  "type": "plain_text_input",
                  "action_id": "plain_text_input-state"
              },
              "label": {
                  "type": "plain_text",
                  "text": "Recipient state/province",
                  "emoji": true
              }
          },
          {
              "type": "input",
              "block_id": "postal_input",
              "element": {
                  "type": "plain_text_input",
                  "action_id": "plain_text_input-postal"
              },
              "label": {
                  "type": "plain_text",
                  "text": "Recipient postal code",
                  "emoji": true
              }
          },
          {
              "type": "input",
              "block_id": "country_input",
              "element": {
                  "type": "plain_text_input",
                  "action_id": "plain_text_input-country"
              },
              "label": {
                  "type": "plain_text",
                  "text": "Recipient country",
                  "emoji": true
              }
          },
          {
              "type": "input",
              "block_id": "message_input",
              "element": {
                  "type": "plain_text_input",
                  "multiline": true,
                  "action_id": "plain_text_input-message"
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

    console.log(result)

  }
catch {
  console.log('error while popping up the modal');
}

});

app.shortcut('open_modal', async ({ ack, payload, client }) => {
    // Acknowledge shortcut request
    ack();
  
    try {
      // Call the views.open method using the WebClient passed to listeners
      const result = await client.views.open({
        trigger_id: payload.trigger_id,
        view: {
          "type": "modal",
          "title": {
            "type": "plain_text",
            "text": "My App"
          },
          "close": {
            "type": "plain_text",
            "text": "Close"
          },
          "blocks": [
            {
              "type": "section",
              "text": {
                "type": "mrkdwn",
                "text": "About the simplest modal you could conceive of :smile:\n\nMaybe <https://api.slack.com/reference/block-kit/interactive-components|*make the modal interactive*> or <https://api.slack.com/surfaces/modals/using#modifying|*learn more advanced modal use cases*>."
              }
            },
            {
              "type": "context",
              "elements": [
                {
                  "type": "mrkdwn",
                  "text": "Psssst this modal was designed using <https://api.slack.com/tools/block-kit-builder|*Block Kit Builder*>"
                }
              ]
            }
          ]
        }
      });
  
      console.log(result);
    }
    catch (error) {
      console.error(error);
    }
  });



app.start(3000)