<template>
  <v-container 
    grid-list-md 
    class="mt-3">
    <v-layout 
      row 
      wrap>
      <v-flex 
        xl12 
        lg12 
        md12 
        sm12 
        xs12>
        <v-card class="elevation-0 transparent pa-4 ml-4 mr-4">
          <v-layout 
            row 
            justify-center>
            <v-flex 
              xl4 
              lg4 
              md4 
              sm4 
              class="hidden-xs-only">
              <v-card class="elevation-0 mr-2 transparent">
                <div class="headline mb-2">User Profile</div>
                <div class="body-1">Manage your basic information: your name, email, and phone number, etc. Help others find you and make it easier to get in touch.</div>
                <!-- <v-btn small @click="getAttributes()">GET</v-btn> -->
              </v-card>
            </v-flex>
            <v-flex 
              xl8 
              lg8 
              md8 
              sm8>
              <v-card class="mb-2">
                <v-toolbar 
                  dense 
                  class="elevation-1">
                  <v-toolbar-title>Personal Details</v-toolbar-title>
                </v-toolbar>
                <app-user-name
                  :name="userModel.name"
                  @updateName="updateName($event)"/>
                <v-divider/>
                <app-user-email
                  :email="userModel.emailAddress"/>
                <v-divider/>
                <app-birth-date
                  :birthdate="userModel.birthDate"
                  :caption="'Birth Date'"
                  @updateBirthDate="updateBirthDate($event)"/>
                <v-divider/>
                <app-phone-number
                  :phone="userModel.phoneNumber"
                  @updatePhoneNumber="updatePhone($event)"/>
                <v-divider/>
                <app-address
                  :address="userModel.homeAddress"
                  :caption="'Home Address'"
                  @updateAddress="updateAddress($event, 'home')"/>
                <v-divider/>
                <app-address
                  :address="userModel.businessAddress"
                  :caption="'Business Address'"
                  @updateAddress="updateAddress($event, 'business')"/>
              </v-card>
              <v-card class="mb-2 mt-4">
                <v-toolbar 
                  dense 
                  class="elevation-1">
                  <v-toolbar-title>Custom Attributes</v-toolbar-title>
                  <v-spacer/>
                  <v-btn 
                    icon 
                    small 
                    dark 
                    color="indigo mr-4" 
                    @click="addCustomForm =! addCustomForm">
                    <v-icon 
                      dark 
                      small>add</v-icon>
                  </v-btn>
                </v-toolbar>
                <template v-for="(item, index) in userModel.custom">
                  <app-custom
                    :key="index"
                    :obj="item"
                    :new-entry="false"
                    :caption="'Custom Atribute' + ' ' + index"
                    @update="updateCustom($event, index)"
                    @delete="deleteCustom(index)"/>
                </template>
              </v-card>
              <v-dialog 
                v-model="addCustomForm" 
                max-width="500px">
                <v-card>
                  <v-toolbar 
                    dense 
                    class="elevation-0">
                    <v-toolbar-title>Add Custom Attribute</v-toolbar-title>
                  </v-toolbar>
                  <app-custom
                    :obj="{ prop1: '', prop2: '', prop3: '', prop4: '', prop5: '' }"
                    :new-entry="true"
                    :caption="'Custom Attribute'"
                    @add="addCustom($event)"
                    @close="addCustomForm =! addCustomForm"/>
                </v-card>
              </v-dialog>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
