<template>
  <div>
    <v-tabs
      v-model="active"
      class="pa-3"
      color="accent"
      dark
      slider-color="primary">
      <v-tab
        href="#tab-1"
        class="mr-4">
        Manual
        <v-icon>build</v-icon>
      </v-tab>
      <v-tab href="#tab-2">
        Scan
        <v-icon>line_style</v-icon>
      </v-tab>
      <v-tab-item id="tab-1">
        <v-data-table
          :headers="headers"
          :items="items"
          hide-actions
          class="elevation-1">
          <template
            slot="items"
            slot-scope="props">
            <td>{{ props.item.id }}
            </td>
            <td>{{ props.item.asset_tag }}</td>
            <td class="text-xs-right">{{ props.item.category }}</td>
            <td class="text-xs-right">{{ props.item.model }}</td>
            <td class="text-xs-right">{{ props.item.status_label }}</td>
            <td class="text-xs-right">{{ props.item.assigned_to }}</td>
            <td class="text-xs-right">{{ props.item.location }}</td>
            <td class="justify-center layout px-0">
              <v-btn
                v-if="!props.item.assigned_to"
                color="primary"
                small
                outline
                @click="checkOut(props.item, props.assigned_to)">
                <!-- <v-icon color="success">edit</v-icon>
             -->CheckOut
              </v-btn>
              <v-btn
                v-if="props.item.assigned_to"
                color="warning"
                small
                outline
                @click="checkIn(props.item, props.item.assigned_to)">
                <!-- <v-icon color="warning">edit</v-icon> -->
                CheckIn
              </v-btn>
            </td>
          </template>
          <template slot="no-data">
            <v-progress-circular
              v-show="loading"
              :size="100"
              indeterminate
              color="primary" />
          </template>
        </v-data-table>

      </v-tab-item>
      <v-tab-item id="tab-2">
        <v-progress-circular
          v-show="loading"
          :size="100"
          indeterminate
          color="primary" />
        <v-layout
          v-show="!loading"
          row>

          <v-flex
            xs6
            1>
            <v-card>

              <qrcode-reader
                :active="active"
                @init="onInit"
                @decode="onDecode">
                <b>{{ overlay }}</b>
              </qrcode-reader>
            </v-card>
          </v-flex>
          <v-flex
            xs6
            2>

            <v-data-table
              v-model="selected"
              :items="qrItems"
              :headers="headers"
              hide-headers
              hide-actions
              class="elevation-1"
              item-key="id">
              <template
                slot="items"
                slot-scope="props">
                <tr
                  v-if="props.item.search"
                  :active="props.selected"
                  @click="props.selected = !props.selected">

                  <td>
                    <v-checkbox
                      v-model="props.selected"
                      primary
                      hide-details />
                  </td>
                  <td>{{ props.item.asset_tag }}</td>

                  <td class="text-xs-right">{{ props.item.model }}</td>

                  <td class="text-xs-right">{{ props.item.location }}</td>
                </tr>
              </template>
              <template slot="no-data">
                Use QR scanner to select items
              </template>
            </v-data-table>
            <v-btn
              color="primary"
              @click="submit">Submit</v-btn>
          </v-flex>

        </v-layout>
        <v-alert
          :value="alert"
          type="warning"
          transition="scale-transition">
          {{ alert }}
        </v-alert>
      </v-tab-item>
    </v-tabs>
  </div>
</template>
<script>
import QrcodeReader from './QRReader'
import Vue from 'vue'
// import axios from 'axios'

Vue.component('qrcode-reader', QrcodeReader)
export default {
  data: () => ({
    active: null,
    alert: '',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    loading: true,
    selectedTab: '',
    overlay: '',
    multipleSelect: [],
    userId: {},
    selected: [],
    search: 'found',
    idList: [],
    checkOutList: [],
    qrItems: [],
    serverPagination: {
      page: 1,
    },
    headers: [
      {
        text: 'id',
        value: 'id',
        align: 'left',
      },
      {
        text: 'Asset',
        value: 'asset_tag',
        align: 'left',
      },
      {
        text: 'Category',
        align: 'left',
        value: 'category',
      },
      {
        text: 'Model',
        align: 'left',
        value: 'model',
      },
      {
        text: 'Status',
        align: 'left',
        value: 'status_label',
      },
      {
        text: 'Assigned To',
        align: 'left',
        value: 'assigned_to',
      },
      {
        text: 'Location',
        align: 'left',
        value: 'location',
      },
      {
        text: 'Actions',
        sortable: false,
        value: 'name',
      },
      {
        text: 'asdf',
        visible: false,
        sortable: false,
        value: 'checky',
      },
    ],
    items: [],
  }),
  computed: {
    user() {
      return this.$store.getters.user
    },
    error() {
      return this.$store.getters.error
    },
  },
  watch: {
    user(value) {
      console.log(value)
      if (value === null || value === undefined) {
        // this.$router.push('/profile')
        console.log('lost user')
      }
    },
    selectedTab(value) {
      console.log(value)
      console.log(this.selectedTab)
    },
  },
  mounted() {
    // once mounted, we need to trigger the initial server data fetch
    this.request({
      pagination: this.serverPagination,
      filter: this.filter,
    })
  },
  methods: {
    checkedOutList() {
      console.log('hi')
      return []
    },
    async submit() {
      console.log(this.selected)
      var contents = {}
      for (let item of this.selected) {
        contents = await this.checkOut(item.id, null)
        console.log(contents)
      }
    },
    remove() {
      console.log(this.selected)
    },
    next() {
      const active = parseInt(this.active)
      this.active = (active < 2 ? active + 1 : 0).toString()
    },
    selectThirdTab() {
      this.selectedTab = 'tab-3'
    },
    onDecode(content) {
      this.updateCheckOutList(content)
    },

    onLocate(points) {
      console.log(points)
    },
    updateCheckOutList(url) {
      this.alert = ''
      if (this.loading) {
        return
      }
      var id = url.split('hardware/')[1]
      var item = this.items.find(x => x.id === id)
      console.log(item)
      if (item && item !== 'undefined') {
        if (item.assigned_to) {
          console.log('problem ')
          this.alert = 'Asset already checked out'
          id = null
          item = null
          return
        }
        if (this.idList.indexOf(id) !== -1) {
          this.alert = 'Item already added'
          id = null
          item = null
          return
        }
        if (id && this.idList.indexOf(id) === -1) {
          this.idList.push(id)
          console.log(this.idList)
          this.request({
            pagination: this.serverPagination,
            filter: this.idList,
            list: 'qr',
          })
        }
      }
    },
    async onInit(promise) {
      this.loading = true
      try {
        await promise
      } catch (error) {
        console.log('dookie')
        if (error.name === 'NotAllowedError') {
          // user denied camera access permisson
        } else if (error.name === 'NotFoundError') {
          // no suitable camera device installed
        } else if (error.name === 'NotSupportedError') {
          // page is not served over HTTPS (or localhost)
        } else if (error.name === 'NotReadableError') {
          // maybe camera is already in use
        } else if (error.name === 'OverconstrainedError') {
          // passed constraints don't match any camera. Did you requested the front camera although there is none?
        } else {
          // browser is probably lacking features (WebRTC, Canvas)
        }
      } finally {
        // hide loading indicator
        this.loading = false
      }
    },
    checkIn(assetId, assignedTo) {
      this.items = []
      this.qrItems = []
      this.idList = []
      if (!assignedTo) {
        console.log('not gonna hapn capnxxx')
        return
      }
      //   this.$api
      // .post('snipeit/hardware/checkin', { assigned_asset: assetId })
      // this.$http
      //   .post('http://47.219.112.177:1880/api/snipeit/hardware/checkin', { assigned_asset: assetId })
      //   .then(response => {
      //     console.log(response)
      //     this.selected = null
      //     this.request({
      //       pagination: this.serverPagination,
      //       filter: this.filter
      //     }).then(console.log('ready'))
      //   })
      //   .catch(e => {
      //     console.log(e)
      //   })
      this.$http
        // eslint-disable-next-line
        .get(process.env.LAMBDA_API + '/checkinHardware', {
          params: { assigned_asset: assetId },
        })
        .then(response => {
          console.log(response)
          this.$router.go(this.$router.currentRoute)
        })
        .catch(error => {
          console.error(error)
        })
    },
    async checkOut(assetId, assignedTo) {
      this.idList = []
      this.qrItems = []
      this.loading = true
      let assId = ''
      try {
        if (assignedTo) {
          console.log('not gonna hapn capn')
          return
        }
        if (!assetId.id) {
          assId = assetId
        } else {
          assId = assetId.id
        }
        console.log(assId)
        console.log(this.$store.getters.profile['custom:snipeit'])

        this.$http
          // eslint-disable-next-line
          .get(process.env.LAMBDA_API + '/checkoutHardware', {
            params: {
              assigned_asset: assId,
              assigned_user: this.$store.getters.profile['custom:snipeit'],
            },
          })
          .then(response => {
            console.log(response)
            this.$router.go(this.$router.currentRoute)
          })
          .catch(e => {
            console.log(e)
          })
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    request({ pagination, filter, list }) {
      this.loading = true
      if (list === 'qr') {
        this.qrItems = []
      }
      if (list === 'main') {
        this.items = []
      }
      if (list === 'both') {
        this.items = []
        this.qrItems = []
      }
      console.log(process.env.LAMBDA_API)
      this.$http
        // eslint-disable-next-line
        .get(process.env.LAMBDA_API + '/getHardware')
        .then(response => {
          this.serverPagination = pagination
          this.serverPagination.rowsNumber = response.data.total
          for (var item of response.data.rows) {
            item.model = item.model.name
            item.category = item.category.name
            if (item.location) {
              item.location = item.location.name
            } else {
              item.location = 'needs location'
            }
            if (item.status_label) {
              item.status_label = item.status_label.name
            }
            if (item.assigned_to) {
              item.assigned_to = item.assigned_to.name
            }
            item.checky = 'xxx'
            if (!filter) {
              this.items.push(item)
            } else {
              for (let id of filter) {
                if (id === item.id) {
                  console.log('qritems')

                  item.search = 'found'
                  this.qrItems.push(item)
                }
              }
            }
          }

          this.loading = false
        })
        .catch(error => {
          // there's an error... do SOMETHING

          // we tell QTable to exit the "loading" state
          console.log('sugar tits ', error)
          this.loading = false
        })
    },
  },
}
</script>
<style scoped>

</style>
