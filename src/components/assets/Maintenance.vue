
<template>
  <div>
    <v-layout
      :v-if="inspection"
      row >
      <!-- <v-flex xs12 sm6 offset-sm3> -->
      <v-flex
        xs12
        sm8
        offset-sm2>

        <v-tabs
          color="primary"
          dark
          slider-color="accent"
        >
          <v-tab
            ripple
          >
            Packages
          </v-tab>
          <v-tab
            ripple
          >
            Reports
          </v-tab>
          <v-tab-item
            :key="packages"
          >

            <v-data-table
              :items="items"
              class="elevation-1"
              hide-actions
              hide-headers
            >
              <template
                slot="items"
                slot-scope="props">
                <v-card >
                  <v-layout row>
                    <v-flex xs2>
                      <v-card-media
                        :src="props.item.primaryImageURL"
                        height="125px"
                        contain
                      />
                    </v-flex>
                    <v-flex xs7>
                      <div>
                        <div class="headline">{{ props.item.name }}</div>
                      </div>
                      <v-list>
                        <v-list-tile
                          v-for="item in props.item.assetList"
                          :key="item.asset_tag"
                          @click="suger">

                          <v-list-tile-content>
                            <v-list-tile-title v-text="item.model"/>
                          </v-list-tile-content>
                          <v-list-tile-action>
                            <v-list-tile-title v-text="item.category"/>
                          </v-list-tile-action>
                        </v-list-tile>
                      </v-list>
                    </v-flex>
                    <v-flex xs2>

                      <v-btn
                        color="info"
                        outline
                        @click.native="newInspection()"
                      >
                        New Inspection
                      </v-btn>
                    </v-flex>
                  </v-layout>

                </v-card>
                <v-divider :key="props.item.index"/>

              </template>
            </v-data-table>
            <v-btn
              fab
              dark
              color="info">
              <v-icon dark>add</v-icon>
            </v-btn>

          </v-tab-item>
          <v-tab-item>
            asdf


          </v-tab-item>
        </v-tabs>

      </v-flex>
    </v-layout>
    <div :v-if="!inspection">inspectyion report</div>
  </div>
</template>

<script>
export default {
  // props: [
  //   'Name',
  //   'primaryImageURL',
  //   'PrimaryAssetID',
  //   'AssetList',
  //   'Department',
  //   'Alerts',
  //   'Status',
  //   'DailyInspections',
  //   'WeeklyInspections',
  //   'Inspectionsist',
  // ],
  data: () => ({
    loading: true,
    inspection: false,
    Limit: 10,
    LastEvaluatedKey: {},
    searchQuery: '',
    // awsversion: AWS.VERSION,
    dialog: false,
    items: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
  }),

  asyncComputed: {
    total() {
      var AwsDocClient = {}
      var params = {
        TableName: 'PACKAGE_TABLE',
        IndexName: 'status-updated_at-index',
        KeyConditionExpression: '#status = :key',
        ExpressionAttributeValues: {
          ':key': this.$route.params.status,
        },
        ExpressionAttributeNames: {
          '#status': 'status',
        },
        Select: 'COUNT',
      }
      return AwsDocClient.query(params)
        .promise()
        .then(data => {
          console.log('COUNT', data)
          document.title = `Status: ${this.$route.params.status
            .charAt(0)
            .toUpperCase() + this.$route.params.status.slice(1)} has ${
            data.Count
          } items`
          return data.Count
        })
    },

    filteredItems() {
      console.log('Route', this.$route)
      console.log(
        'Route status',
        this.$route.params.status,
        'Query',
        this.$route.query
      )
      const status = this.$route.params.status
      console.log('Status', status)
      var params = {
        TableName: 'Movies',
        Limit: this.Limit,
        ScanIndexForward: false,
        IndexName: 'status-updated_at-index',
        KeyConditionExpression: '#status = :key',
        ExpressionAttributeValues: {
          ':key': status,
        },
        ExpressionAttributeNames: {
          '#status': 'status',
        },
      }
      if (this.$route.query.uuid) {
        console.log('Starting from', this.$route.query)
        params.ExclusiveStartKey = this.$route.query
      }
      var AwsDocClient = {}

      return AwsDocClient.query(params)
        .promise()
        .then(data => {
          // console.log(data)
          this.loading = false
          this.LastEvaluatedKey = data.LastEvaluatedKey
          // this.count = data.Items.length
          return data.Items
        })
    },

    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
  },

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      this.items = [
        {
          name: 'White van',
          primaryImageURL:
            'http://192.168.1.171:83/uploads/assets/7DHCWRWnWqwv8GpFKrjShuQhc.png',
          department: 'Carpet Cleaning',
          assetList: [
            {
              asset_id: 1,
              asset_tag: 1233,
              model: 'Boxxer',
              category: 'Truckmount',
            },
            {
              asset_id: 2,
              asset_tag: 3232,
              model: 'Ford 150',
              category: 'Vehicle',
            },
          ],
        },
        {
          name: 'Green Truck',
          primaryImageURL:
            'http://192.168.1.171:83/uploads/assets/7DHCWRWnWqwv8GpFKrjShuQhc.png',
          department: 'Carpet Cleaning',
          assetList: [
            {
              asset_id: 1,
              asset_tag: 1233,
              model: 'Boxxer',
              category: 'Truckmount',
            },
            {
              asset_id: 2,
              asset_tag: 3232,
              model: 'Ford 150',
              category: 'Vehicle',
            },
          ],
        },
      ]
    },

    editItem(item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      const index = this.items.indexOf(item)
      confirm('Are you sure you want to delete this item?') &&
        this.items.splice(index, 1)
    },

    close() {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem)
      } else {
        this.items.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>
