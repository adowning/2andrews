import axios from "axios"

export function handler(event, context, callback) {
  let config = {
    headers: {
      'Content-type': 'x-www-form-urlencoded',

    }
  };

  let creds = {
    client_id: '8fca92a4a5276109256648f2d9fc0dda23187c21',
    client_secret: '4fc5583b5f14f6f999b4d5b071e708b52be23467',
    grant_type: 'password',
    username: 'andrewsgroup',
    password: 'sugarlips42',
    redirect_uri: 'http://localhost/',

  }
  axios({
    method: "POST",
    "url": "https://www.humanity.com/oauth2/token.php",
    "data": creds,
    "headers": {
      // "content-type": "x-www-form-urlencoded"

    }
  }).then(result => {
    var cache = [];

    var x = JSON.stringify(result.data, function (key, value) {
      if (typeof value === 'object' && value !== null) {
        if (cache.indexOf(value) !== -1) {
          // Circular reference found, discard key
          return
        }
        // Store value in our collection
        cache.push(value)
      }
      return value
    })
    callback(null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: x,
    })

  }, error => {
    console.error(error);
  })
}
