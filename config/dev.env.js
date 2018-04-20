var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  AWS_COGNITO_USER_POOL_DOMAIN:
    '"groupandrews.auth.us-east-1.amazoncognito.com"',
  // AWS_COGNITO_CLIENT_ID: '"4jcmshlse80ab667okni41fbf5"',
  AWS_COGNITO_CLIENT_ID: '"3k5d6ioumeukfvinbi63mptrlr"',
  AUTH_TEST_API_ENDPOINT:
    '"https://t6gychwq8i.execute-api.eu-west-1.amazonaws.com/prod"',
    LAMBDA_API:
    '"http://localhost:9000"'
})
