const express = require('express')
const router = express.Router()
var axios = require('axios');


//users Home page
router.get('/',(req, res)=>{
    res.send("Users home page!!!")
})

router.post('/send', (req, res) => {
    

// sending 4 x 6 handwritten post card 

    var data = JSON.stringify({
        "image_template": 6,
        "handwriting_style": 4,
        "message": req.body.message,
        "recipients": [
          {
            "name": req.body.name,
            "address": req.body.street,
            "city": req.body.city,
            "province": req.body.state,
            "postal_code": req.body.postal,
            "country": req.body.country
          }
        ]
      });
      
      var config = {
        method: 'post',
        url: 'https://api.thanks.io/api/v2/send/postcard',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });

})

module.exports = router;