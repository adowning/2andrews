<!-- eslint-disable -->
<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <!-- <v-flex xs6>
        <v-card dark color="primary"> 
        <v-card>
          <v-card-text class="px-0">{{date}}</v-card-text>
        </v-card> 
      </v-flex> -->
       <v-flex x6>
        <v-card>
          <v-card-text class="px-0">{{date}}</v-card-text>
        </v-card>
      </v-flex>
               
    </v-layout>
    <v-layout row wrap>
      <v-flex xs6>
        <v-layout row>
    <v-flex xs8>
      <v-card>
        <v-toolbar color="cyan">
          <v-toolbar-title>{{date}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <!-- <v-btn icon>
            <v-icon>search</v-icon> 
          </v-btn>-->
        </v-toolbar>
        <v-list two-line>
              <v-list-tile-content v-if="!clockStatus">
           <v-btn block color="primary" dark @click.native="clockIn">Clock In</v-btn>
              </v-list-tile-content>
             <v-list-tile-content v-if="clockStatus">
                  {{startTime}} 
              </v-list-tile-content>
           <!-- <template v-for="(item, index) in items">
            <v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
            <v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider>
            <v-list-tile avatar v-else :key="item.title" @click="">
              <v-list-tile-avatar>
                <img :src="item.avatar">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>  -->
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
      </v-flex>
      <!-- <v-flex xs6>
        <v-card dark color="secondary">
          <v-card-text class="px-0">Time Sheets</v-card-text>
        </v-card>
      </v-flex> -->
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
  data () {
      return {
        clockStatus: false,
        date: moment().format('LLLL'),
        items: [
          { header: 'Today' },
          { avatar: '/static/doc-images/lists/1.jpg', title: 'Brunch this weekend?', subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?" },
          { divider: true, inset: true },
          { avatar: '/static/doc-images/lists/2.jpg', title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>', subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend." },
          { divider: true, inset: true },
          { avatar: '/static/doc-images/lists/3.jpg', title: 'Oui oui', subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?" }
        ]
      }
    },
   watch: {
    //  clockedIn (val) {
    //       console.log(val)
    //  },
      steps (val) {
        if (this.e1 > val) {
          this.e1 = val
        }
      }
    },

    methods: {
      clockIn(){
        console.log('asdf')
          this.startTime =  moment().format('h:mm a'),
          this.clockStatus = true
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