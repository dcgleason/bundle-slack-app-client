const result = await client.views.open({
    trigger_id: body.trigger_id,
    view: {
      type: "modal",
      title: {
        type: "plain_text",
        text: "Bundle"
      },
      close: {
        type: "plain_text",
        text: "Close"
      },

      blocks: [
        {
            type: "input",
            block_id: "street_input",
            element: {
                type: "plain_text_input",
                action_id: "plain_text_input-city"
            },
            label: {
                type: "plain_text",
                text: "Recipient street address",
                emoji: true
            }
        },
        {
            type: "input",
            block_id: "city_input",
            element: {
                type: "plain_text_input",
                action_id: "plain_text_input-city"
            },
            label: {
                type: "plain_text",
                text: "Recipient city",
                emoji: true
            }
        },
        {
            type: "input",
            block_id: "state_input",
            element: {
                type: "plain_text_input",
                action_id: "plain_text_input-state"
            },
            label: {
                type: "plain_text",
                text: "Recipient state/province",
                emoji: true
            }
        },
        {
            type: "input",
            block_id: "postal_input",
            element: {
                type: "plain_text_input",
                action_id: "plain_text_input-postal"
            },
            label: {
                type: "plain_text",
                text: "Recipient postal code",
                emoji: true
            }
        },
        {
            type: "input",
            block_id: "country_input",
            element: {
                type: "plain_text_input",
                action_id: "plain_text_input-country"
            },
            label: {
                type: "plain_text",
                text: "Recipient country",
                emoji: true
            }
        },
        {
            type: "input",
            block_id: "message_input",
            element: {
                type: "plain_text_input",
                multiline: true,
                action_id: "plain_text_input-message"
            },
            label: {
                type: "plain_text",
                text: "Your message",
                emoji: true
            }
        },
        {
            type: "section",
            text: {
                type: "mrkdwn",
                text: "Click submit to send a letter (in the mail)"
            },
           accessory: {
                type: "button",
                text: {
                    type: "plain_text",
                     text: "Submit",
                    emoji: true
                },
                value: "click_me_123",
                action_id: "button-action"
            }
        }
    ]
    }
  });