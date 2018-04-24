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
          <v-list>
            <v-layout row v-if="!clockStatus">
              <v-flex xs10 offset-xs1>
                <v-btn block color="info" dark @click.native="clockIn">Clock In</v-btn>
              </v-flex>
            </v-layout>
            <div v-if="clockStatus">
              <v-layout mt-2 row wrap>
                <v-flex xs12 sm4 ml-3>
                  Clocked in.
                </v-flex>
                <v-flex xs12 sm6> {{start_time}}
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs8 ml-3>
                  <v-text-field v-model="notes" label="Notes" />
                </v-flex>
                <v-flex xs1>
                  <v-btn color="info" @click.native="editNotes">Edit Notes</v-btn>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs10 ml-3>
                  <v-btn block color="error" dark @click.native="clockOut">Clock Out</v-btn>
                </v-flex>
              </v-layout>
            </div>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex xs7>
        <v-card>
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Timesheets</v-toolbar-title>
            <v-spacer>
            </v-spacer>
            <v-menu offset-y>
              <v-btn outline slot="activator">This Week</v-btn>
              <v-list>
                <v-list-tile v-for="item in weeks" :key="item.title" @click="item.amount">
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-toolbar>
          <v-data-table :headers="headers" :items="items" hide-actions class="elevation-1">
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
//asdf
export default {
  data() {
    return {
      clockStatus: false,
      timeFigured: false,
      notes: '',
      st: {},
      et: {},
      weeks: [{ title: 'Last Week', amount: 1 }, { title: 'Week Before Last', amount: 2 }],
      date: moment().format('LLL'),
      serverPagination: {
        page: 1
      },
      headers: [
        {
          text: 'Length',
          value: 'length',
          align: 'left'
        },
        {
          text: 'Clock in',
          value: 'in_time',
          align: 'in_time'
        },
        {
          text: 'Clock out',
          align: 'left',
          value: 'out_time'
        },
        {
          text: 'Date',
          align: 'left',
          value: 'model'
        }
      ],
      items: []
    }
  },

  computed: {
    totalTime: function() {
      var diff = moment(this.et) - moment(this.st)
      return moment.utc(moment.duration(diff).asMilliseconds()).format('H:mm')
    },
    startEndDates: function(n) {
      return {
        start_date: moment()
          .subtract(n, 'w')
          .startOf('week')
          .format('YYYY-MM-DD'), // set to the first day of this week, 12:00 am
        end_date: moment()
          .subtract(n, 'w')
          .endOf('week')
          .format('YYYY-MM-DD') // set to the first day of this week, 12:00 am
      }
    }
  },
  created() {
    this.request(0)
  },
  methods: {
    clockIn() {
      this.start_time = moment().format('hh:mm:ss')
      this.start_date = moment().format('YYYY-MM-DD')
      this.st = new moment()
      this.clockStatus = true
    },
    clockOut() {
      this.end_time = moment().format('hh:mm:ss')
      this.end_date = moment().format('YYYY-MM-DD')
      this.et = new moment()
      this.clockedIn = false
      this.timeFigured = true
      this.$http
        //eslint-disable-next-line
        .get(process.env.LAMBDA_API + '/createTimeClock', {
          params: {
            start_date: this.start_date,
            end_date: this.end_date,
            start_time: this.start_time,
            // end_time: this.end_time,
            end_time: '11:56:36',
            employee: this.$store.getters.profile['custom:humanity']
          }
        })
        .then(response => {
          console.log(response)
          this.snipeitID = response.data
        })
        .catch(error => {
          console.error(error)
        })
    },
    request() {
      this.loading = true
      this.$http
        //eslint-disable-next-line
        .get(process.env.LAMBDA_API + '/getTimeClocks', {
          params: {
            start_date: this.startEndDates.start_date,
            end_date: this.startEndDates.end_date,
            employee: this.$store.getters.profile['custom:humanity']
          }
        })
        .then(response => {
          console.log(response)
          this.serverPagination = false
          // this.serverPagination.rowsNumber = response.data.total
          for (var item of response.data) {
            this.items.push(item)
          }
          this.loading = false
        })
        .catch(error => {
          console.log('sugar tits ', error)
          this.loading = false
        })
    }
  }
}
</script>
