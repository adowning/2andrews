
<template>
  <div>
    <v-alert 
      :value="true" 
      class="ma-5" 
      type="info">
      <alert info>
        This is for existing employees who are just starting on the new system. Before you begin you will need your username from humanity and your username from Service Monster. You should only have to do this once.
      </alert>
    </v-alert>
    <v-form 
      ref="form" 
      v-model="valid" 
      class="ma-5" 
      lazy-validation 
      netlify>
      <v-stepper 
        v-model="e13" 
        vertical 
        elevation-0>
        <v-stepper-step 
          step="1" 
          complete>
          Basic Information
        </v-stepper-step>
        <v-stepper-content step="1">
          <!-- <v-card color="grey lighten-1" class="mb-5" height="200px"> -->
          <v-container fluid>
            <v-layout row>
              <v-flex xs4>
                <v-subheader>Name</v-subheader>
              </v-flex>
              <v-flex xs8>
                <v-text-field 
                  v-model="name" 
                  :rules="nameRules" 
                  label="John Doe" 
                  required />
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs4>
                <v-subheader>Phone</v-subheader>
              </v-flex>
              <v-flex xs8>
                <v-text-field 
                  v-model="phone" 
                  :rules="phoneRules" 
                  label="555-555-5555" 
                  required />
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs4>
                <v-subheader>Email</v-subheader>
              </v-flex>
              <v-flex xs8>
                <v-text-field 
                  v-model="email" 
                  :rules="emailRules" 
                  label="johndoe@gmail.com" 
                  required />
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs4>
                <v-subheader>Postion applying for</v-subheader>
              </v-flex>
              <v-flex xs8>
                <v-select 
                  v-model="select" 
                  :items="items" 
                  :rules="[v => !!v || 'Item is required']" 
                  required />
              </v-flex>
            </v-layout>
          </v-container>

          <v-btn 
            color="primary" 
            @click.native="e13 = 2">Continue</v-btn>
            <!-- <v-btn flat>Back</v-btn> -->
        </v-stepper-content>
        <v-stepper-step 
          step="2" 
          complete>Address</v-stepper-step>
        <v-stepper-content step="2">
          <v-text-field 
            ref="address" 
            :rules="[
              () => !!address || 'This field is required',
              () => !!address && address.length <= 25 || 'Address must be less than 25 characters'
            ]" 
            v-model="address" 
            label="Address Line" 
            placeholder="Snowy Rock Pl" 
            counter="25" 
            required />
          <v-text-field 
            ref="city" 
            :rules="[() => !!city || 'This field is required']" 
            v-model="city" 
            label="City" 
            placeholder="El Paso" 
            required />
          <v-text-field 
            ref="state" 
            v-model="state" 
            :rules="[() => !!state || 'This field is required']" 
            label="State/Province/Region" 
            required 
            placeholder="TX" />
          <v-text-field 
            ref="zip" 
            :rules="[() => !!zip || 'This field is required']" 
            v-model="zip" 
            label="ZIP / Postal Code" 
            required 
            placeholder="79938" />

          <v-btn 
            color="primary" 
            @click.native="e13 = 3">Continue</v-btn>
          <v-btn 
            color="secondary" 
            @click.native="e13 = 1">Back</v-btn>
        </v-stepper-content>

        <v-stepper-step 
          step="3" 
          complete>Work History</v-stepper-step>
        <v-stepper-content step="3">
          <!-- <v-card color="grey lighten-1" class="mb-5" height="200px"> -->

          <v-stepper v-model="e1">
            <div 
              v-for="n in historySteps" 
              :key="n.id">
              <v-stepper-step :step="n">
                Work history #{{ n }}
              </v-stepper-step>
              <v-stepper-content :step="n">
                <v-layout 
                  row 
                  wrap>
                  <v-flex 
                    xs11 
                    sm5>
                    <v-text-field 
                      :v-model="`position-${n}`" 
                      box 
                      label="Place of employment" />
                  </v-flex>
                  <v-spacer/>
                  <v-flex 
                    xs11 
                    sm5>
                    <v-text-field 
                      :v-model="`position-${n}`" 
                      box 
                      label="Position" />
                  </v-flex>
                </v-layout>
                <v-layout 
                  row 
                  wrap>
                  <v-flex 
                    xs11 
                    sm5>
                    <v-menu 
                      ref="menu" 
                      :close-on-content-click="false" 
                      v-model="menu" 
                      :nudge-right="40" 
                      :return-value.sync="date" 
                      lazy 
                      transition="scale-transition" 
                      offset-y 
                      full-width 
                      min-width="290px">
                      <v-text-field 
                        slot="activator" 
                        :v-model="`startDate-${n}`" 
                        label="Start Date" 
                        prepend-icon="event" 
                        readonly />
                      <v-date-picker 
                        v-model="date" 
                        no-title 
                        scrollable>
                        <v-spacer/>
                        <v-btn 
                          flat 
                          color="primary" 
                          @click="menu = false">Cancel</v-btn>
                        <v-btn 
                          flat 
                          color="primary" 
                          @click="$refs.menu.save(date)">OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-flex>
                  <v-spacer/>
                  <v-flex 
                    xs11 
                    sm5>
                    <v-menu 
                      ref="menu2" 
                      :close-on-content-click="false" 
                      v-model="menu2" 
                      :nudge-right="40" 
                      :return-value.sync="date" 
                      lazy 
                      transition="scale-transition" 
                      offset-y 
                      full-width 
                      min-width="290px">
                      <v-text-field 
                        slot="activator" 
                        :v-model="`endDate-${n}`" 
                        label="End Date" 
                        prepend-icon="event" 
                        readonly />
                      <v-date-picker 
                        v-model="date" 
                        no-title 
                        scrollable>
                        <v-spacer/>
                        <v-btn 
                          flat 
                          color="primary" 
                          @click="menu = false">Cancel</v-btn>
                        <v-btn 
                          flat 
                          color="primary" 
                          @click="$refs.menu.save(date)">OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-flex>
                </v-layout>

                <v-flex xs12>
                  <v-text-field 
                    :v-model="`${n}-company`" 
                    label="Reason for leaving" 
                    box 
                    multi-line />
                </v-flex>

                <!-- <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card> -->
                <v-btn 
                  flat 
                  small 
                  outline 
                  color="primary" 
                  @click="nextStep(n)">Add another job/>
                  <v-btn 
                    flat 
                    small 
                    outline>Remove job history/>
                  </v-btn>
                </v-btn>
              </v-stepper-content>
              <!-- </v-stepper-items> -->
            </div>

          </v-stepper>

          <!-- </v-card> -->
          <v-btn 
            color="primary" 
            @click.native="e13 = 4">Continue</v-btn>
          <v-btn 
            color="secondary" 
            @click.native="e13 = 2">Back</v-btn>
        </v-stepper-content>
        <v-stepper-step step="4">
          Availablilty
        </v-stepper-step>
        <v-stepper-content step="4">
          <!-- <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card> -->
          <!-- <v-card  class="mb-5" height="200px"> -->
          Please select your availablity to work
          <v-container fluid>
            <v-layout 
              v-for="d in 6" 
              :key="d.id" 
              row 
              wrap>
              <v-flex xs6>
                <v-subheader>{{ weekDays[d] }}</v-subheader>
              </v-flex>
              <v-flex xs6>
                <v-select 
                  :items="times" 
                  :v-model="`${d}-time`" 
                  label="Select" 
                  single-line />
              </v-flex>
            </v-layout>
          </v-container>
          <!-- </v-card> -->
          <v-btn 
            color="primary" 
            @click.native="e13 = 5">Continue</v-btn>
          <v-btn 
            color="secondary" 
            @click.native="e13 = 2">Back</v-btn>
        </v-stepper-content>
        <v-stepper-step step="5">Finish</v-stepper-step>
        <v-stepper-content step="5">
          <!-- <v-btn color="primary" @click.native="e13 = 1">Continue</v-btn> -->
          <v-alert 
            :value="true" 
            type="warning">
            Rules and Conditions: By clicking "Finish" I confirm and agree that I have a valid Social Security number, I am authorized to work in the United States and I am at least 18 years of age.
          </v-alert>
          <v-checkbox 
            v-model="checkbox" 
            :rules="[v => !!v || 'You must agree to continue!']" 
            label="I agree to allow Andrews Flooring to run a background check based on the information I have provided with this application." 
            required />

          <v-btn 
            flat 
            @click.native="e13 = 3">Back</v-btn>
        </v-stepper-content>
      </v-stepper>
      <v-btn 
        :disabled="!valid" 
        @click="submit">
        submit
      </v-btn>
      <v-btn @click="clear">clear</v-btn>
    </v-form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    e13: 1,
    e1: 1,
    date: null,
    position: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    menu: false,
    menu2: false,
    d: 0,
    valid: false,
    historySteps: 1,
    name: '',
    nameRules: [v => !!v || 'Name is required', v => (v && v.length <= 10) || 'Name must be less than 10 characters'],
    phone: '',
    phoneRules: [
      v => !!v || 'Phone number is required',
      v => /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(v) || 'Name must be in the form 555-555-5555'
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
    ],
    select: null,
    items: ['Carpet Cleaning Tech', 'Janitorial Staff', 'Office'],
    times: ['UNAVIALBLE', 'DAY SHIFT', 'NIGHT SHIFT', 'BOTH'],
    weekDays: ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    checkbox: false
  }),

  watch: {
    steps(val) {
      if (this.e1 > val) {
        this.e1 = val
      }
    }
  },
  methods: {
    onInput(val) {
      this.steps = parseInt(val)
    },
    nextStep() {
      this.e1++
      this.historySteps++
      // if (n === this.steps) {
      //   this.e1 = 1
      // } else {
      //   this.e1 = n + 1
      // }
    },
    submit() {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        axios.post('/api/submit', {
          name: this.name,
          email: this.email,
          select: this.select,
          checkbox: this.checkbox
        })
      }
    },
    clear() {
      this.$refs.form.reset()
    }
  }
}
</script>

<style scoped>

</style>
