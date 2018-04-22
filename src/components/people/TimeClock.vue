<!-- eslint-disable -->
<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs6>
        <!-- <v-card dark color="primary"> -->
        <v-card>
          <v-card-text class="px-0">{{date}}</v-card-text>
        </v-card>
      </v-flex>
       <v-flex xs6>
        <v-card>
          <v-card-text class="px-0">Time Sheets</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs6>
        <v-card>
          <v-card-text class="px-0">
            <v-stepper  vertical>
              <v-stepper-step  v-show="!clockedIn" step="1">
               <v-btn color="primary" @click.native="clockIn()">Clock In</v-btn>
              {{ startTime }}
                  <v-list-tile-content >
                <v-list-tile-title>{{ startTime }}</v-list-tile-title>
              </v-list-tile-content>
              </v-stepper-step>
              <!-- <v-stepper-content step="1">
              </v-stepper-content> -->
               <v-stepper v-model="e1" vertical>
      <!-- <v-stepper-header> -->
        <template v-for="n in steps">
          <v-stepper-step  v-show="clockedIn"
            :key="`${n}-step`"
            :step="n"
            :complete="e1 > n"
          >
             <v-flex xs12 sm6  v-show="clockedIn">
        <v-text-field box label="Notes" v-model="first"></v-text-field>
      </v-flex>

          </v-stepper-step>
          <!-- <v-divider v-if="n !== steps" :key="n"></v-divider> -->
        </template>
      <!-- </v-stepper-header> -->
      <!-- <v-stepper-items> -->
        <!-- <v-stepper-content
          :step="n"
          v-for="n in steps"
          :key="`${n}-content`"
        >
         
        </v-stepper-content> -->
      <!-- </v-stepper-items> -->
            </v-stepper>
              <v-stepper-step  v-show="clockedIn" step="6">
               <v-btn color="warning" @click.native="clockOut()">Clock Out</v-btn>                
              </v-stepper-step>
              <!-- <v-stepper-content step="2">
               
              </v-stepper-content> -->
            </v-stepper>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs6>
        <v-card dark color="secondary">
          <v-card-text class="px-0">Time Sheets</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
// import router from '../../router'
import moment from 'moment'
// import poolData from "./config"
// eslint-disable-next-line
// var AmazonCognitoIdentity = require('amazon-cognito-identity-js')
// var userPool = []
// const poolData = {
//   UserPoolId: 'us-east-1_abZ9mC9i8',
//   ClientId: '257pbc9k89flmkiq0cq5a7epl9'
// }
export default {
  data: () => ({
    date: moment().format('MMMM Do YYYY - h:mm a'),
     e13: 2,
     e1: 1,
     steps: 1,
     clockedIn: false,
     first: '',
     startTime: '',
     endTime: ''
  }),
   watch: {
      steps (val) {
        if (this.e1 > val) {
          this.e1 = val
        }
      }
    },

    methods: {
      clockIn(){
          this.startTime =  moment().format('h:mm a'),
          this.clockedIn = true
      },
        clockOut(){
          this.endTime = new moment()
          this.clockedIn = false
      },
      onInput (val) {
        this.steps = parseInt(val)
      },
      nextStep (n) {
        if (n === this.steps) {
          this.e1 = 1
        } else {
          this.e1 = n + 1
        }
      }
    }
}
</script>