<!-- eslint-disable -->
<template>
  <v-container grid-list-md>

    <v-layout row wrap>
      <v-flex xs5>
        <v-card>
          <v-toolbar color="primary" dark>
            <v-toolbar-title>{{date}}</v-toolbar-title>
            <v-spacer></v-spacer>

            <v-subheader v-if="timeFigured">Total Time: {{totalTime}}</v-subheader>
          </v-toolbar>
          <template v-if="loading">
            <!-- <v-progress-circular indeterminate :size="70" :width="7" color="primary"></v-progress-circular> -->
            <v-progress-linear :indeterminate="true"></v-progress-linear>

          </template>
          <template v-if="!loading">

            <v-list>
              <template v-if="clockStatus ==='out'">
                <v-layout row my-4>
                  <v-flex xs6 offset-xs3>
                    <v-btn block color="info" dark @click.native="updateClockStatus()">Clock In</v-btn>
                  </v-flex>
                </v-layout>
              </template>
              <template v-if="clockStatus === 'in'">
                <v-layout row mt-4>
                  <v-flex xs8 offset-xs1>
                    <v-text-field name="input-1" label="Note" id="testing"></v-text-field>
                  </v-flex>
                  <v-flex xs1>
                    <v-btn flat color="info" dark @click.native="addNote()">Add Note</v-btn>
                  </v-flex>
                </v-layout>
                <v-layout row mb-4>
                  <v-flex xs6 offset-xs3>
                    <v-btn block color="error" dark @click.native="updateClockStatus()">Clock Out</v-btn>
                  </v-flex>
                </v-layout>
              </template>
            </v-list>
          </template>
        </v-card>
      </v-flex>
      <v-flex xs7>
        <v-card>
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Timesheets</v-toolbar-title>
            <v-spacer>
            </v-spacer>
            <v-menu offset-y>
              <v-btn outline white slot="activator">This Week</v-btn>
              <v-list>
                <v-list-tile v-for="week in weeks" :key="week.title" @click="changeWeek(week.amount)">
                  <v-list-tile-title>{{ week.title }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-toolbar>
          <template v-if="loading">
            <!-- <v-progress-circular indeterminate :size="70" :width="7" color="primary"></v-progress-circular> -->
            <v-progress-linear :indeterminate="true"></v-progress-linear>

          </template>
          <v-data-table v-if="!loading" :headers="headers" :items="items" hide-actions class="elevation-1">
            <template slot="items" slot-scope="props">
              <td>{{ props.item.length.total_hours }}</td>
              <td class="text-xs-right">{{ props.item.in_time.time }}</td>
              <td class="text-xs-right">{{ props.item.out_time.time }}</td>
              <td class="text-xs-right">{{ props.item.in_time.day }}</td>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import moment from 'moment'
// import {
//   Auth,
//   // Logger
// } from 'aws-amplify'
// const logger = new Logger('TIMECLOCK')

export default {
  data() {
    return {
      loading: false,
      timeSheetID: null,
      current_length: {},
      clockStatus: null,
      timeFigured: false,
      notes: '',
      st: {},
      et: {},
      weeks: [
        { title: 'This Week', amount: 0 },
        { title: 'Last Week', amount: 1 },
        { title: 'Two Weeks Ago', amount: 2 },
      ],
      week: null,
      date: moment().format('LLL'),
      serverPagination: {
        page: 1,
      },
      headers: [
        {
          text: 'Length',
          value: 'length',
          align: 'left',
        },
        {
          text: 'Clock in',
          value: 'in_time',
          align: 'in_time',
        },
        {
          text: 'Clock out',
          align: 'left',
          value: 'out_time',
        },
        {
          text: 'Date',
          align: 'left',
          value: 'model',
        },
      ],
      items: [],
    }
  },

  computed: {
    user: function(){
        return this.$store.auth.getters.profile
    },
    totalTime: function() {
      var diff = moment(this.et) - moment(this.st)
      return moment.utc(moment.duration(diff).asMilliseconds()).format('H:mm')
    },
    startEndDates: function() {
      return {
        start_date: moment()
          .subtract(this.week, 'w')
          .startOf('week')
          .format('YYYY-MM-DD'), // set to the first day of this week, 12:00 am
        end_date: moment()
          .subtract(this.week, 'w')
          .endOf('week')
          .format('YYYY-MM-DD'), // set to the first day of this week, 12:00 am
      }
    },
  },
  created() {
    // Auth.currentUserInfo()
    //   .then(user => {logger.info(user.attributes)
    //   this.user = user
    //    this.request(0)
    //   }
    //   )
this.request(0)
    // this.getClockStatus()
  },
  methods: {
    getClockStatus() {
      this.$http
        // eslint-disable-next-line
        .get(process.env.LAMBDA_API + '/getClockStatus', {
          params: {
            id: this.user.attributes['custom:humanity'],
            token: this.$ht,
          },
        })
        .then(response => {
          console.log(response)
          this.clockStatus = response.data.data
          this.loading = false
        })
        .catch(error => {
          console.error(error)
        })
    },
    updateClockStatus() {
      this.timeFigured = true
      var command = ''
      if (this.clockStatus === 'in') {
        command = 'clockout'
      } else {
        command = 'clockin'
      }
      this.$http
        // eslint-disable-next-line
        .get(process.env.LAMBDA_API + '/createTimeClock', {
          params: {
            id: this.user.attributes['custom:humanity'],
            inOut: command,
            token: this.$ht,
          },
        })
        .then(response => {
          // console.log(response.data)
          var data = JSON.parse(response.data)
          this.timeSheetID = data.data
          // console.log(data.data.id)
          // console.log(data['id'])
          // console.log(data.id)
          // this.clockStatus = response.data
          this.request()
        })
        .catch(error => {
          console.error(error)
        })
    },
    request() {
      this.items = []
      this.loading = true
      this.$http
        // eslint-disable-next-line
        .get(process.env.LAMBDA_API + '/getTimeClocks', {
          params: {
            start_date: this.startEndDates.start_date,
            end_date: this.startEndDates.end_date,
            employee: this.$store.getters.profile['custom:humanity'],
            token: this.$ht,
          },
        })
        .then(response => {
          // console.log(response)
          this.serverPagination = false
          // this.serverPagination.rowsNumber = response.data.total
          for (var item of response.data) {
            if (item.out_day !== 0) {
              this.items.push(item)
            }
          }
          this.current_length = response.data.current_length
          this.getClockStatus()
        })
        .catch(error => {
          console.log('sugar tits ', error)
          this.loading = false
        })
    },
    changeWeek(amount) {
      console.log(amount)
      this.week = amount
      this.items = []
      this.request()
    },
    addNote() {
      this.$http
        // eslint-disable-next-line
        .get(process.env.LAMBDA_API + '/addNote', {
          params: {
            id: this.timeSheetID,
            token: this.$ht,
          },
        })
        .then(response => {
          console.log(response)
          // this.clockStatus = response.data.data
          // this.loading = false
        })
        .catch(error => {
          console.error(error)
        })
    },
  },
}
</script>
