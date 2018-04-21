<template>
  <div>
    <v-card-text class="pl-4 pr-4">
      <div class="tool a-0 ma-0">
        <div class="caption mb-1">Name</div>
        <v-spacer/>
        <v-btn
          icon
          flat
          small
          class="pa-0 ma-0 topright"
          @click="showEditView = !showEditView">
          <v-icon
            v-if="fullNameUp !== '  '"
            small
            color="indigo lighten-1">edit</v-icon>
          <v-icon
            v-else
            small
            color="indigo lighten-1">mdi-plus-circle-outline</v-icon>
        </v-btn>
      </div>
      <div class="body-2">{{ fullNameUp === '  ' ? '...' : fullNameUp }}</div>
    </v-card-text>
    <div
      v-if="showEditView"
      class="pt-2 pl-2 pr-2 pb-2 indigo lighten-5">
      <v-card-text class="indigo lighten-5">
        <v-text-field
          v-model="nameUpdate.first"
          label="First Name"/>
        <v-text-field
          v-model="nameUpdate.middle"
          label="Middle Name"/>
        <v-text-field
          v-model="nameUpdate.last"
          label="Last Name"/>
      </v-card-text>
      <v-card-actions>
        <v-btn
          :disabled="!enableSave"
          class="ml-4"
          small
          @click="cancelEdit()">CANCEL</v-btn>
        <v-spacer/>
        <v-btn
          small
          @click="closeEdit()" >CLOSE</v-btn>
        <v-btn
          :disabled="!enableSave"
          class="mr-4"
          small
          color="success"
          @click="updateAttribute()">SAVE</v-btn>
      </v-card-actions>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: { type: Object, required: true }
  },
  data: function() {
    return {
      nameUpdate: {
        first: '',
        middle: '',
        last: ''
      },
      showEditView: false,
      enableSave: false
    }
  },
  computed: {
    fullNameUp: function() {
      return this.nameUpdate.first + ' ' + this.nameUpdate.middle + ' ' + this.nameUpdate.last
    },
    fullNameProp: function() {
      return this.name.first + ' ' + this.name.middle + ' ' + this.name.last
    }
  },
  watch: {
    fullNameUp: function() {
      if (
        this.nameUpdate.first !== this.name.first ||
        this.nameUpdate.middle !== this.name.middle ||
        this.nameUpdate.last !== this.name.last
      ) {
        this.enableSave = true
      } else {
        this.enableSave = false
      }
    },
    fullNameProp: function() {
      this.nameUpdate = JSON.parse(JSON.stringify(this.name))
    }
  },
  methods: {
    cancelEdit: function() {
      this.nameUpdate = JSON.parse(JSON.stringify(this.name))
    },
    closeEdit: function() {
      this.cancelEdit()
      this.showEditView = false
    },
    updateAttribute: function() {
      this.$emit('updateName', this.nameUpdate)
      this.enableSave = false
    }
  }
}
</script>
<style scoped>
.tool {
  position: relative;
  padding: 0px;
  margin: 0px;
}
.topright {
  position: absolute;
  top: 0px;
  right: 0px;
}
</style>
