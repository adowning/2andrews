<template>
  <v-container
    grid-list-md
    class="mt-3">
    <v-layout
      row
      wrap
      justify-center>
      <v-flex
        xl8
        lg12
        md12
        sm12
        xs12>
        <v-card class="pa-4 ml-4 mr-4">
          <v-layout
            row
            justify-center>
            <v-flex
              xl4
              lg4
              md4
              sm4
              class="hidden-xs-only">
              <v-card class="elevation-0 pa-2 mr-2">
                <v-card-media>
                  <img
                    class="aws-logo"
                    src="../../../static/aws_cognito.png">
                </v-card-media>
              </v-card>
            </v-flex>
            <v-flex
              xl6
              lg6
              md6
              sm6>
              <transition
                appear
                name="fadeout">
                <v-card class="elevation-0 pa-2 ml-1 mr-1">
                  <v-alert
                    v-model="showerr"
                    outline
                    type="error"
                    dismissible
                    class="ml-3 mr-3">
                    {{ errmsg }}
                  </v-alert>
                  <v-card-title primary-title>
                    <div>
                      <h4 class="headline mb-0">Wait for confirmation</h4>
                    </div>
                  </v-card-title>
                  <v-card-text>
                    <div>
                      A confirmation code was sent to your managers email address.
                      <p>Once authorized go to the login screen and enter your username and password
                      </p>
                    </div>
                    <v-btn
                      :to="'/'"
                      block
                      class="mt-3 mb-3"
                      dark
                      color="primary">
                      Go to login screen
                    </v-btn>

                  </v-card-text>
                </v-card>
              </transition>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<!--<template>
  <v-container
    grid-list-md
    class="mt-3">
    <v-layout
      row
      wrap
      justify-center>
      <v-flex
        xl8
        lg12
        md12
        sm12
        xs12>
        <v-card class="pa-4 ml-4 mr-4">
          <v-layout
            row
            justify-center>
            <v-flex
              xl4
              lg4
              md4
              sm4
              class="hidden-xs-only">
              <v-card class="elevation-0 pa-2 mr-2">
                <v-card-media >
                  <img
                    class="aws-logo"
                    src="../../../static/aws_cognito.png">
                </v-card-media>
              </v-card>
            </v-flex>
            <v-flex
              xl6
              lg6
              md6
              sm6>
              <transition
                appear
                name="fadeout">
                <v-card class="elevation-0 pa-2 ml-1 mr-1">
                  <v-alert
                    v-model="showerr"
                    outline
                    type="error"
                    dismissible
                    class="ml-3 mr-3">
                    {{ errmsg }}
                  </v-alert>
                  <v-card-title primary-title>
                    <div>
                      <h4 class="headline mb-0">Enter Confirmation Code</h4>
                    </div>
                  </v-card-title>
                  <v-card-text>
                    <v-form v-model="valid">
                      <v-text-field
                        v-model="code"
                        :rules="codeRules"
                        label="Confirmation Code"
                        required/>
                    </v-form>
                    <v-btn
                      :loading="loading"
                      :disabled="!valid"
                      block
                      class="mt-3 mb-3"
                      dark
                      color="primary"
                      @click.native="onSubmit()">
                      Confirm
                      <span slot="loader">Connecting...</span>
                    </v-btn>
                    <div>
                      A confirmation code was sent to your email address.
                    </div>
                  </v-card-text>
                </v-card>
              </transition>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>-->

<script>
import router from '../../router'
// import poolData from "./config"
// eslint-disable-next-line
var AmazonCognitoIdentity = require('amazon-cognito-identity-js')
var userPool = []
const poolData = {
  UserPoolId: 'us-east-1_abZ9mC9i8',
  ClientId: '257pbc9k89flmkiq0cq5a7epl9'
}
export default {
  data: () => ({
    callback: false,
    confirmed: false,
    showerr: false,
    errcode: '',
    errmsg: '',
    valid: false,
    code: '',
    codeRules: [v => !!v || 'Code is required'],
    loader: false,
    loading: false
  }),
  watch: {
    confirmed() {
      if (this.confirmed === true) {
        router.push('/registered')
      }
    },
    errcode() {
      console.log('watched error code: ' + this.errcode)
      if (this.errcode !== '') {
        if (this.errcode === '"CodeMismatchException"') {
          this.errmsg = 'Invalid verification code provided'
        } else if (this.errcode === '"NotAuthorizedException"') {
          this.errmsg = 'The user has already been confirmed'
        } else if (this.errcode === '"UserNotFoundException"') {
          this.errmsg = 'Username id not found!'
        } else if (this.errcode === '"LimitExceededException"') {
          this.errmsg = 'Attempt limit exceeded, please try after some time'
        } else {
          this.errmsg = 'An error has occured!'
        }
        this.showerr = true
      }
    }
  },
  methods: {
    onSubmit() {
      this.loader = 'loading'
      const l = this.loader
      this[l] = !this[l]

      userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)
      var userData = {
        Username: this.$store.state.username,
        Pool: userPool
      }
      console.log('confirmation code for ' + userData.Username + ': ' + this.code)
      var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)

      cognitoUser.confirmRegistration(this.code, true, (err, result) => {
        if (!this.callback) {
          this.callback = true
          console.log('confirm callback')
          if (err) {
            console.log('confirmation error: ' + JSON.stringify(err))
            this.errcode = JSON.stringify(err.code)
          } else {
            console.log('confirmation success: ' + JSON.stringify(result))
            this.confirmed = true
          }
          this[l] = false
          this.loader = null
        }
      })
    }
  }
}
</script>

<style scoped>
.aws-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
a {
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
