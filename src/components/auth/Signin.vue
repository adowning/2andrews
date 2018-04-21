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
            <v-layout
              column
              align-center>
              <transition
                appear
                name="fadeout">
                <img
                  class="aws-logo"
                  style="width:140px;height:140px"
                  src="../../../static/logo.png">
              </transition>
              <h3 class="mb-3 text-xs-center grey--text hidden-xs-only">Andrews Administration</h3>
              <!-- <h3 class="mb-3 text-xs-center grey--text hidden-xs-only">using Amazon Cognito and Vue.js with Material Design</h3> -->
            </v-layout>
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
                      <!-- <h4 class="headline mb-0">Andrews Admin Application</h4> -->
                    </div>
                  </v-card-title>
                  <v-card-text>
                    <v-form v-model="valid">
                      <v-text-field
                        v-model="email"
                        label="E-mail"
                        required/>
                      <v-text-field
                        v-model="password"
                        :rules="passRules"
                        :append-icon="hidepw ? 'visibility' : 'visibility_off'"
                        :append-icon-cb="() => (hidepw = !hidepw)"
                        :type="hidepw ? 'password' : 'text'"
                        label="Password"
                        hint="At least 8 characters"
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
                      Sign In
                      <span slot="loader">Connecting...</span>
                    </v-btn>
                    <div >
                      <router-link :to="'/forgot'">Forgot password?</router-link>
                    </div>
                  </v-card-text>
                  <!-- <button
                    class="btn btn-outline-dark"
                    @click="authenticate()">Cognito Hosted UI</button> -->

                </v-card>
              </transition>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import router from '../../router'
import * as config from './config'
import auth from '../../services/auth'
import storex from '../../store'

// var poolData = config.poolData
// eslint-disable-next-line
var AmazonCognitoIdentity = require('amazon-cognito-identity-js')
export default {
  data: function() {
    return {
      callback: false,
      showerr: false,
      errcode: '',
      errmsg: '',
      username: 'ash',
      valid: false,
      email: 'ash',
      emailRules: [
        // eslint-disable-next-line
        v => !!v || 'E-mail is required',
        // eslint-disable-next-line
        v =>
          // eslint-disable-next-line
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      password: 'asdfasdf',
      passRules: [v => !!v || 'Password is required', v => v.length >= 8 || 'Password must be at least 8 characters'],
      hidepw: true,
      loader: false,
      loading: false
    }
  },
  watch: {
    errcode() {
      console.log('watched error code: ' + this.errcode)
      if (this.errcode !== '') {
        if (this.errcode === '"NotAuthorizedException"') {
          this.errmsg = 'Incorrect username or password'
        } else if (this.errcode === '"UserNotFoundException"') {
          this.errmsg = 'User not found'
        } else if (this.errcode === '"UserNotConfirmedException"') {
          this.errmsg = 'User registration not confirmed'
        } else if (this.errcode === '"LimitExceededException"') {
          this.errmsg = 'Attempt limit exceeded, please try after some time'
        } else {
          this.errmsg = 'An error has occured!'
        }
        this.showerr = true
      } else {
        this.showerr = false
      }
    }
  },
  created() {
    // return auth.authenticate(provider)
    // this.authenticate()
  },
  methods: {
    authenticate(provider) {
      return auth.authenticate(provider)
    },
    onSubmit() {
      this.loader = 'loading'
      const l = this.loader
      this[l] = !this[l]

      console.log('sign in with: ' + this.email + ' ' + this.password)
      var authenticationData = {
        Username: this.email,
        Password: this.password
      }
      console.log('auth data: ' + authenticationData.Username + ' ' + authenticationData.Password)
      var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData)

      this.$store.state.userPool = new AmazonCognitoIdentity.CognitoUserPool(config.poolData)
      var userData = {
        Username: this.email,
        Pool: this.$store.state.userPool
      }
      this.$store.state.cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData)
      this.$store.state.cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: result => {
          console.log(result.accessToken)
          console.log(result.idToken)
          // console.log(result.verification)
          // console.log(result.expiresIn)
          storex.dispatch('authenticate', {
            accessToken: result.accessToken,
            idToken: result.idToken
            //  verification: result.verification,
            //  expiresIn: result.expiresIn
          })
          // if (!this.callback) {
          //   this.callback = true
          //   console.log("sign in success")
          //   this.$store.state.auth.authenticated = true
          //   this.$store.state.username = this.email
          //   this.username = this.email
          //   this[l] = false
          //   this.loader = null
          //   console.log(this.$store.state.username)
          //   router.push("/callback")
          // }
        },
        onFailure: err => {
          console.error(err)
          // if (!this.callback) {
          // console.log("sign in failure")
          // this.errcode = JSON.stringify(err.code)
          // this[l] = false
          // this.loader = null
          // }
        }
      })
    },
    navRreset: function() {
      router.push('/forgot')
    },
    getMessage: function() {
      return this.message
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
