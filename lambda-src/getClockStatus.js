import axios from 'axios'
// const token = '?access_token=1698483cbae72d5d186ea540154c1c9aeaf26c77'
const BASE_URL = 'https://www.humanity.com/api/v2/'

const instance = axios.create( {
  baseURL: BASE_URL,
  timeout: false
} )
// Add a request interceptor
instance.interceptors.request.use(
  function ( config ) {
    //eslint-disable-next-line
    /* global window Store */
    config.headers.common[ 'Access-Control-Allow-Origin' ] = '*'

    return config
  },
  function ( error ) {
    // Do something with request error
    return Promise.reject( error )
  }
)

instance.interceptors.response.use(
  response => response,
  error => {
    console.log( error.config )
    return Promise.reject( error )
  }
)
export function handler( event, context, callback ) {
  var id = JSON.parse( event.queryStringParameters.id )
  instance.get( "timeclocks/status/" + id + "/0?access_token=1698483cbae72d5d186ea540154c1c9aeaf26c77", {
    params: {
      details: 0
    }
  } ).then( response => {
    var cache = []
    console.log( response.data )
    var x = JSON.stringify( response.data, function ( key, value ) {
      if ( typeof value === 'object' && value !== null ) {
        if ( cache.indexOf( value ) !== -1 ) {
          // Circular reference found, discard key
          return
        }
        cache.push( value )
      }
      return value
    } )
    cache = null // Enable garbage collection
    console.log( x )
    callback( null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: x,
    } )
  } )
}

// /* eslint-disable */
// var axios = require( 'axios' )
// const humanity = axios.create( {
//   baseURL: "https://www.humanity.com/api/v2/timeclocks/?access_token=1698483cbae72d5d186ea540154c1c9aeaf26c77",
//   timeout: 7000,
//    headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },

// } )
// exports.handler = ( event, context, callback ) => {
//   snipeit.get( 'https://www.humanity.com/api/v2/timeclocks/?access_token=1698483cbae72d5d186ea540154c1c9aeaf26c77' ).then( data => {
//     var cache = [];
//     var x = JSON.stringify( data.data, function ( key, value ) {
//       if ( typeof value === 'object' && value !== null ) {
//         if ( cache.indexOf( value ) !== -1 ) {
//           // Circular reference found, discard key
//           return;
//         }
//         // Store value in our collection
//         cache.push( value );
//       }
//       return value;
//     } );
//     cache = null; // Enable garbage collection
//     callback( null, {
//       statusCode: 200,
//       headers: {
//         'Access-Control-Allow-Origin': '*'
//       },
//       body: x,
//     } )

//   } );
// }
