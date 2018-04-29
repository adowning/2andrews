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
                        v-model="humanityID"
                        :rules="humanityRules"
                        label="Humanity ID"
                        hint="Click on your profile at humanity.com and type in 7 digit code at end"
                        required/>
                      <v-btn
                        block
                        class="mt-3 mb-3"
                        outline
                        color="secondary"
                        @click.native="verifyHumanity">Check ID</v-btn>
                      <v-text-field
                        v-show="validHumanityID"
                        v-model="firstname"
                        disabled
                        label="First Name"
                        required/>
                      <v-text-field
                        v-show="validHumanityID "
                        v-model="lastname"
                        disabled
                        label="Last Name"
                        required/>
                      <v-text-field
                        v-show="validHumanityID "
                        v-model="password"
                        :rules="passRules"
                        :append-icon="hidepw ? 'visibility' : 'visibility_off'"
                        :append-icon-cb="() => (hidepw = !hidepw)"
                        :type="hidepw ? 'password' : 'text'"
                        label="New Password"
                        hint="At least 6 characters"
                        required/>
                    </v-form>
                    <!-- <v-btn :loading="loading" :disabled="!valid" block class="mt-3 mb-3" dark color="primary" @click.native="onSubmit()"> -->
                    <v-btn
                      :loading="loading"
                      :disabled="!valid"
                      block
                      class="mt-3 mb-3"
                      dark
                      color="primary"
                      @click.native="onSubmit()">
                      Register
                      <span slot="loader">Connecting...</span>
                    </v-btn>
                    <div>
                      <!-- <router-link :to="'/forgot'">Forgot password?</router-link><br> -->
                      <router-link :to="'/login'">Go to login</router-link>
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
// eslint-disable-next-line
var AmazonCognitoIdentity = require('amazon-cognito-identity-js')

var userPool = []
var attributeList = []
var dataEmail = {
  Name: 'email',
  Value: ''
}
var dataHumanityID = {
  Name: 'custom:humanity',
  Value: ''
}
var dataSnipeitID = {
  Name: 'custom:snipeit',
  Value: ''
}
export default {
  data: function() {
    return {
      callback: false,
      showerr: false,
      errcode: '',
      humanityID: '1444044',
      errmsg: '',
      validHumanityID: false,
      firstname: '',
      lastname: '',
      valid: false,
      snipeitID: '',
      password: '',
      humanityRules: [
        v => !!v || 'HumanityID is required',
        v => v.length === 7 || 'HumanityID must be 7 characters'
        // v => /^(?=.*[0-9])/.test(v) || 'Password must contain at least 1 number',
        // v => /^(?=.*[a-z])/.test(v) || 'Password must contain at least 1 lower case letter',
        // v => /^(?=.*[A-Z])/.test(v) || 'Password must contain at least 1 upper case letter',
        // v => /^(?=.*[!@#$%^&*"])/.test(v) || 'Password must contain at least 1 special character (!@#$%^&*")'
      ],
      passRules: [
        v => !!v || 'Password is required',
        v => v.length >= 6 || 'Password must be 6-20 characters'
        // v => /^(?=.*[0-9])/.test(v) || 'Password must contain at least 1 number',
        // v => /^(?=.*[a-z])/.test(v) || 'Password must contain at least 1 lower case letter',
        // v => /^(?=.*[A-Z])/.test(v) || 'Password must contain at least 1 upper case letter',
        // v => /^(?=.*[!@#$%^&*"])/.test(v) || 'Password must contain at least 1 special character (!@#$%^&*")'
      ],
      hidepw: true,
      loader: false,
      loading: false
    }
  },

  computed: {
    username() {
      return (this.firstname.charAt(0) + '.' + this.lastname).toLowerCase()
    },
    email() {
      return (this.firstname.charAt(0) + '.' + this.lastname).toLowerCase() + '@groupandrews.com'
    }
  },
  watch: {
    errcode() {
      console.log('watched error code: ' + this.errcode)
      if (this.errcode !== '') {
        if (this.errcode === '"UsernameExistsException"') {
          this.errmsg = 'An account with the given email already exists!'
        } else {
          this.errmsg = 'An error has occured!'
        }
        this.showerr = true
      }
    }
  },
  methods: {
    // createSnipeitUser() {
    //   this.$http
    //     //eslint-disable-next-line
    //     .get(process.env.LAMBDA_API + '/createSnipeitUser', {
    //       params: { first_name: this.firstname, username: this.username }
    //     })
    //     // .get(process.env.LAMBDA_API + '/createSnipeitUser', { params: { user_info: data } })
    //     .then(response => {
    //       console.log(response.payload.id)
    //       return response
    //     })
    //     .catch(error => {
    //       console.error(error)
    //     })
    // },
    verifyHumanity() {
      this.$http
        // eslint-disable-next-line
        .get(process.env.LAMBDA_API + '/getHumanityID', { params: { id: this.humanityID } })
        .then(response => {
          this.humanityID = response.data.id
          this.firstname = response.data.firstname
          this.lastname = response.data.lastname
          this.validHumanityID = true
          this.$http
            // eslint-disable-next-line
            .get(process.env.LAMBDA_API + '/createSnipeitUser', {
              params: { first_name: this.firstname, username: this.username }
            })
            // .get(process.env.LAMBDA_API + '/createSnipeitUser', { params: { user_info: data } })
            .then(response => {
              console.log(response)
              this.snipeitID = response.data
            })
            .catch(error => {
              console.error(error)
            })
        })
        .catch(error => {
          console.error(error)
        })
      // this.humanity.getData('employees/' + this.humanityID).then(res => {
      //   this.humanityEmployee = res.data.data
      // })
    },
    onSubmit() {
      this.loader = 'loading'
      const l = this.loader
      this[l] = !this[l]

      dataEmail.Value = this.email
      dataHumanityID.Value = this.humanityID
      dataSnipeitID.Value = this.snipeitID.toString()
      var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail)
      attributeList.push(attributeEmail)
      var attributeHumanityID = new AmazonCognitoIdentity.CognitoUserAttribute(dataHumanityID)
      attributeList.push(attributeHumanityID)
      var attributeSnipeitID = new AmazonCognitoIdentity.CognitoUserAttribute(dataSnipeitID)
      attributeList.push(attributeSnipeitID)
      userPool = new AmazonCognitoIdentity.CognitoUserPool(config.poolData)
      this.callback = false
      this.errcode = ''

      userPool.signUp(this.username, this.password, attributeList, null, (err, result) => {
        if (!this.callback) {
          this.callback = true
          console.log('register callback')
          if (err) {
            console.log('registration error: ' + JSON.stringify(err))
            this.errcode = JSON.stringify(err.code)
          } else {
            this.message = JSON.stringify(result.message)
            this.username = result.user.getUsername()
            this.$store.state.username = this.username
            router.push('/confirm')
          }
          this[l] = false
          this.loader = null
        }
      })
    },
    navRreset: function() {
      router.push('/reset')
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
