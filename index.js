const { App } = require("@slack/bolt");
require('dotenv').config({ path: require('find-config')('.env') })
const axios = require('axios')

const app = new App({
    token: process.env.token, //Find in the Oauth  & Permissions tab
    signingSecret: process.env.singingSecret, // Find in Basic Information Tab
    socketMode:true,
    appToken: process.env.SLACK_APP_TOKEN // Token from the App-level Token that we created
});


app.shortcut('send_letter', async ({ shortcut, ack, client, logger }) => {

    try {
      // Acknowledge shortcut request
      await ack();
  
      // Call the views.open method using one of the built-in WebClients
      const result = await client.views.open({
        trigger_id: shortcut.trigger_id,
        view: {
          type: "modal",
          title: {
            type: "plain_text",
            text: "My App"
          },
          close: {
            type: "plain_text",
            text: "Close"
          },
          blocks: [
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: "About the simplest modal you could conceive of :smile:\n\nMaybe <https://api.slack.com/reference/block-kit/interactive-components|*make the modal interactive*> or <https://api.slack.com/surfaces/modals/using#modifying|*learn more advanced modal use cases*>."
              }
            },
            {
              type: "context",
              elements: [
                {
                  type: "mrkdwn",
                  text: "Psssst this modal was designed using <https://api.slack.com/tools/block-kit-builder|*Block Kit Builder*>"
                }
              ]
            }
          ]
        }
      });
  
      logger.info(result);
    }
    catch (error) {
      logger.error(error);
    }
  });


app.command("/send", async ({ command, ack, say }) => {
    try {
        await ack();

        const { values } = view.state;
        const taskName = values.task_name_input.name;
        const taskDescription = values.task_description_input.description;
                    
        const inputs = {
          taskName: { value: taskName.value },
          taskDescription: { value: taskDescription.value }
        };
        await say({
            "blocks": [
                {
                    "type": "input",
                    "block_id": 'address_input',
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
                    "block_id": 'city_input',
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
                    "block_id": 'state_input',
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
                    "block_id": 'postal_input',
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
                    "block_id": 'country_input',
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
                    "block_id": 'message_input',
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
                }
            ]
        })
     

      const email = view.state.values['email_address']['input_a'].value;
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



// The echo command simply echoes on command
app.command('/echo', async ({ command, ack, respond }) => {
    // Acknowledge command request
    await ack();
  
    await respond(`${command.text}`);
  });

app.start(3000)