/* eslint-disable */
import request from "request"
const token = '?access_token=1698483cbae72d5d186ea540154c1c9aeaf26c77'

export function handler( event, context, callback ) {
  console.log( event.queryStringParameters )
  var options = {
    method: 'POST',
    url: "https://www.humanity.com/api/v2/timeclocks/?access_token=1698483cbae72d5d186ea540154c1c9aeaf26c77",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: event.queryStringParameters,
    json: true
  }
  request( options, function ( error, response, body ) {
    var cache = [];
    console.log( 'xxx' )
    console.log( response.body )
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
    if ( id != 'none' ) {
      var x = JSON.stringify( id, function ( key, value ) {
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
    callback( null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: x,
    } )
  } )
}
