<template>
  <v-container>
    <div>
      <v-dialog 
        v-model="dialog" 
        max-width="500px">
        <v-btn 
          slot="activator" 
          disabled 
          color="primary" 
          dark 
          class="mb-2" >New Item</v-btn>
        <v-card>
          <v-card-title>
            <!-- <span class="headline">{{ formTitle }}</span> -->
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex 
                  xs12 
                  sm6 
                  md4>
                  <v-text-field 
                    v-model="editedItem.amt" 
                    label="Dessert name"/>
                </v-flex>

              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn 
              color="blue darken-1" 
              flat 
              @click.native="close">Cancel</v-btn>
            <v-btn 
              color="blue darken-1" 
              flat 
              @click.native="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-data-table
        :headers="headers"
        :items="items"
        hide-actions
        class="elevation-1"
      >
        <template 
          slot="items" 
          slot-scope="props">
          <td>{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.category.name }}</td>
          <td class="text-xs-right">{{ props.item.qty }}</td>
          <td class="text-xs-right">{{ props.item.remaining }}</td>
          <td class="text-xs-right">{{ props.item.min_amt }}</td>
          <td class="text-xs-right">{{ props.item.location.name }}</td>
          <td class="justify-center layout px-0">
            <v-btn 
              v-if="!props.item.assigned_to" 
              disabled 
              color="primary" 
              small 
              outline 
              @click="checkOut(props.item)">
              Take
            </v-btn>

          </td>
        </template>
        <template slot="no-data"/>
      </v-data-table>
      <v-alert 
        :value="true" 
        type="warning">
        I had to remove the ability to edit these so the "take" button is disabled
      </v-alert>
    </div>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    serverPagination: {
      page: 1
    },
    dialog: false,
    editedIndex: -1,
    editedItem: {
      name: "",
      category: 0,
      qty: 0,
      remaining: 0,
      min_amt: 0,
      location: 0
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    },
    headers: [
      {
        text: "name",
        value: "id",
        align: "left",
        sortable: false
        // visible: false
      },
      {
        text: "Category",
        // name: 'category',
        align: "left",
        value: "category"
      },
      {
        text: "Order to",
        // name: 'qty',
        align: "left",
        value: "qty"
      },
      {
        text: "Remaining",
        // name: 'remaining',
        value: "remaining"
      },
      {
        text: "Minimum",
        // name: 'min_amt',
        value: "min_amt"
      },
      {
        text: "Location",
        // name: 'location',
        value: "location"
      },
      { text: "Actions", value: "name", sortable: false }
    ],
    items: []
  }),
  computed: {
    user () {
      return this.$store.getters.user
    },
    error () {
      return this.$store.getters.error
    }
  },
  watch: {
    user (value) {
      console.log(value)
      if (value === null || value === undefined) {
        // this.$router.push('/profile')
        console.log("lost user")
      }
    }
  },

  mounted () {
    // once mounted, we need to trigger the initial server data fetch
    this.request({
      pagination: this.serverPagination,
      filter: this.filter
    })
  },
  created () {
    // this.initialize()
  },
  methods: {
    initialize () {},
    editItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.items.indexOf(item)
      confirm("Are you sure you want to delete this item?") &&
        this.items.splice(index, 1)
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem)
      } else {
        this.items.push(this.editedItem)
      }
      this.close()
    },
    checkOut (assetId) {
      // if (!actions.checkout || assigned_to) {
      //   console.log('not gonna hapn capn')
      //   return
      // }
      // this.$api
      //   .post('snipeit/consumables/' + assetId + '/checkout', {
      //     assigned_user: this.user.id,
      //     assigned_asset: assetId
      //   })
      //   .then(response => {
      //     console.log(response)
      //     this.selected = null
      //     // this.$router.go(this.$router.currentRoute)
      //     // this.request(20, 0)
      //   })
      //   .catch(e => {
      //     console.log(e)
      //   })
      this.$api

        .post("/snipeit/consumable/take", {
          assetId: assetId,
          assigned_user: this.user.custom["30551"].value
        })
        .then(response => {
          console.log(response)
          this.selected = null
          this.$router.go(this.$router.currentRoute)
          // this.request(20, 0)
        })
        .catch(e => {
          console.log(e)
        })
    },
    request ({ pagination, filter }) {
      console.log("updating", pagination, filter)
      this.loading = true

      this.$http
        .get("http://47.219.112.177:1880/api/snipeit/consumables")
        .then(({ data }) => {
          console.log(data.rows)
          // this.serverPagination = pagination
          // this.serverPagination.rowsNumber = data.rowsNumber

          this.items = data.rows

          this.loading = false
        })
        .catch(error => {
          console.error(error)
          this.loading = false
        })
    }
  },
}
</script>
