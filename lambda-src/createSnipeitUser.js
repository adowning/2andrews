/* eslint-disable */
import request from "request"

export function handler( event, context, callback ) {
  var x = callback
  x.asdf = 'adsf'
  var options = {
    method: 'POST',
    url: 'http://47.219.112.177:83/api/v1/users',
    headers: {
      'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijg2YzM2MTgxMzhmMTgxZWFiNjYxODA0ZWVlM2JjYjJjYmMzM2FjMWVlNjM2YjY5NDZkNzVlMzhmZmM4NTFjYzBkYjg1MGI4OGUyZThiYjU2In0.eyJhdWQiOiI4IiwianRpIjoiODZjMzYxODEzOGYxODFlYWI2NjE4MDRlZWUzYmNiMmNiYzMzYWMxZWU2MzZiNjk0NmQ3NWUzOGZmYzg1MWNjMGRiODUwYjg4ZTJlOGJiNTYiLCJpYXQiOjE1MjM0NjQ0NDMsIm5iZiI6MTUyMzQ2NDQ0MywiZXhwIjoxNTU1MDAwNDQzLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.vOFDvt-779QzbItigmgjZdNaTYmKkuiduL01HJbgR3_oQ-_EKtDVt8KS2FZ-8QAcBgVwuXOZm-ZgssB92cEVvwspQsjiH8T1RTVB9ZpFK5HQU_hhErpBuaWD_FkupjzYz_PnJqDzU8j6I79vAPbkCF_NNPyI0DsjwXMSTx_a8d0yItfxroxHWdHaD9_MFPbO9l_TmYmu42aaQG9wMVNZUqvpk6iFiiS_mOQBh3sdwR-CCxnfz0lIMydfFEjfnNlmkexA0ThorMJKAr4YB28nVWQnoTf-Fx8mNdH42OLlzWGj0ZWCJAIHVpDiECGZw0xL6dCngJgCXvPHWpI7H2Lj6HL1vkJr4DLsd-oZlAk2h3u0g5W839ENoSaFJdt9t6Imk4MEAf8P2W0n5plhBjcpUJJXni93tSA5RO2_XQXRprWmUKMEvFajey2aNIVUq1rcW7PaFciwRDT5wkxFb294zhR_ElAF52Yzjq1ZH78_2hMsDyWq7sFrZ-Th-pPmXKsaUmNch8AZOSbeoqQyCGNduPjLZaV1qqeZhWGJD4bw9YLBdRliiqCSkV9UHYqauO0b8ZYFjZ5dC1s1E3TnsFya93LQG_rLMeeaZ9tQ6AfnHx4liL5fdB_LQNw8zLN_iGn0WdQZtWOMP2EJfB0lECBOnI5AnHRnWrGWJzCe3s6IxZo',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: {
      first_name: event.queryStringParameters.first_name,
      username: event.queryStringParameters.username,
      password: 'Andrews1',
      activated: 'true'
    },
    json: true
  }
  request( options, function ( error, response, body ) {
    var cache = [];
    console.log( response.body.payload )
    var id = 'none'
    if ( response.body.payload ) {
      try {
        id = response.body.payload.id
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
