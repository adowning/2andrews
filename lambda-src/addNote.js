/* eslint-disable */
import request from "request"
export function handler( event, context, callback ) {
  // var id = JSON.parse( event.queryStringParameters.id )
  // var inOut = JSON.parse( event.queryStringParameters.inOut )
  var id = event.queryStringParameters.id
  var options = {
    method: 'POST',
    // url: "https://www.humanity.com/api/v2/employees/" + id + "/" + inOut + "/?access_token=1698483cbae72d5d186ea540154c1c9aeaf26c77",
    url: "https://www.humanity.com/api/v2/timeclock/savenote?access_token=1698483cbae72d5d186ea540154c1c9aeaf26c77",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: {
      'id': event.queryStringParameters.id,
      notes: 'whazzzzup '
    }
  }
  request( options, function ( error, response, body ) {
    var cache = [];
    var id = 'none'
    if ( response.body ) {
      try {
        id = response.body
      } catch ( error ) {
        console.log( error )
      }
    }
    // var id = response.body.payload.id
    if ( error )
      throw new Error( error )
    console.log( event.queryStringParameters.id )
    if ( event.queryStringParameters.id != 'none' ) {
      var x = JSON.stringify( event.queryStringParameters.id, function ( key, value ) {
        if ( typeof value === 'object' && value !== null ) {
          if ( cache.indexOf( value ) !== -1 ) {
            // Circular reference found, discard key
            return
          }
          // Store value in our collection
          cache.push( value )
        }
        return value
      } )
    }
    cache = null // Enable garbage collection
    // console.log( x )
    callback( null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: x,
    } )
  } )
}
