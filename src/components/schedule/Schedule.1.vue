<template>
  <v-container>
    <section>
      <FullCalendar/>
    </section>
  </v-container>
</template>
<script>
import { FullCalendar } from 'vue-full-calendar'
export default {
  name: 'Schedule',
  components: {
    FullCalendar,
  },
  created: {
     initClient(){
        gapi.client.init({
          apiKey: 'AIzaSyCrD4Wo9t_kzCFuOQkD40e6INV06f1b0eI',
          clientId: 'leOxWVU0hEBnBZdNhaRihs8W',
          // discoveryDocs: DISCOVERY_DOCS,
          scope: 'https://www.googleapis.com/auth/calendar.readonly'
        }).then(function () {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          authorizeButton.onclick = handleAuthClick;
          signoutButton.onclick = handleSignoutClick;
        })
     }
      },

  methods: {
      /**
       *  Initializes the API client library and sets up sign-in state
       *  listeners.
       * / 650381717617-u5h5fsj61p13aoaj631ljv053aok5e9r.apps.googleusercontent.com
       */


      /**
       *  Called when the signed in status changes, to update the UI
       *  appropriately. After a sign-in, the API is called.
       */
     updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
          authorizeButton.style.display = 'none';
          signoutButton.style.display = 'block';
          listUpcomingEvents();
        } else {
          authorizeButton.style.display = 'block';
          signoutButton.style.display = 'none';
        }
      },

     handleAuthClick(event) {
        gapi.auth2.getAuthInstance().signIn();
      },

      /**
       *  Sign out the user upon button click.
       */
     handleSignoutClick(event) {
        gapi.auth2.getAuthInstance().signOut();
      },

      /**
       * Append a pre element to the body containing the given message
       * as its text node. Used to display the results of the API call.
       *
       * @param {string} message Text to be placed in pre element.
       */
     appendPre(message) {
        var pre = document.getElementById('content');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
      },

      /**
       * Print the summary and start datetime/date of the next ten events in
       * the authorized user's calendar. If no events are found an
       * appropriate message is printed.
       */
     listUpcomingEvents() {
        gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 10,
          'orderBy': 'startTime'
        }).then(function(response) {
          var events = response.result.items;
          appendPre('Upcoming events:');

          if (events.length > 0) {
            for (i = 0; i < events.length; i++) {
              var event = events[i];
              var when = event.start.dateTime;
              if (!when) {
                when = event.start.date;
              }
              appendPre(event.summary + ' (' + when + ')')
            }
          } else {
            appendPre('No upcoming events found.');
          }
        })
  },
}
}
</script>



<style lang="stylus">
    @import '~fullcalendar/dist/fullcalendar.css';
</style>
