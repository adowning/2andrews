<template>
  <v-app>
 <template v-if="isAuthenticated">
   
      <!-- <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet"> -->
        <v-navigation-drawer
                width="250"
                class="blue-grey darken-4"
                dark
                persistent
                :mini-variant="miniVariant"
                v-model="drawer"
                fixed
                app
        >
            <v-toolbar flat class="transparent" dense>
                <v-list class="pa-0" :class="{'list-border-bottom' : miniVariant}">
                    <v-list-tile> 
                        <v-list-tile-action v-if="!miniVariant">
                            <!-- <v-icon large color="orange">invert_colors</v-icon> -->
                                            <img src="../../../static/logo.png" style="width:30px;height:30px;">

                        </v-list-tile-action>
                        <v-list-tile-content v-if="!miniVariant">
                            <v-list-tile-title style="color: #41B883;"><h3>Andrews App</h3></v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-btn icon @click.stop="miniVariant = !miniVariant">
                                <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
                            </v-btn>
                        </v-list-tile-action>
                    </v-list-tile>
                </v-list>
            </v-toolbar>
            <v-divider></v-divider>

            <v-tooltip right :disabled="!miniVariant" dense>
                <v-toolbar flat class="transparent" dense slot="activator">
                    <v-list class="pa-0" :class="{'list-border-bottom' : miniVariant}">
                        
                        <v-list-tile
                                to="/"
                                exact
                        >
                            <v-list-tile-action>
                                <v-icon>home</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>Project Overview</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </v-toolbar>
                <span>Project Overview</span>
            </v-tooltip>
            <v-divider></v-divider>

            <v-list subheader :class="{'list-border-bottom' : miniVariant}">
                <v-subheader>ANALYTICS</v-subheader>
                <template v-for="item in middleItems">
                    <v-tooltip right :disabled="!miniVariant">
                        <v-list-tile
                                :key="item.icon"
                                :to="item.link"
                                exact
                                slot="activator"
                        >
                            <v-list-tile-action>
                                <v-icon v-html="item.icon"></v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title v-text="item.title"></v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <span v-text="item.title"></span>
                    </v-tooltip>
                </template>
            </v-list>
            <v-divider></v-divider>

            <v-list subheader>
                <v-subheader>ASSETS</v-subheader>
                <template v-for="item in lastItems">
                    <v-tooltip right :disabled="!miniVariant">
                        <v-list-tile
                                :key="item.icon"
                                :to="item.link"
                                exact
                                slot="activator"
                        >
                            <v-list-tile-action>
                                <v-icon v-html="item.icon"></v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title v-text="item.title"></v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <span v-text="item.title"></span>
                    </v-tooltip>
                </template>
            </v-list>
            <v-divider></v-divider>
             <v-list subheader>
                <v-subheader>PEOPLE</v-subheader>
                <template v-for="item in topItems">
                    <v-tooltip right :disabled="!miniVariant">
                        <v-list-tile
                                :key="item.icon"
                                :to="item.link"
                                exact
                                slot="activator"
                        >
                            <v-list-tile-action>
                                <v-icon v-html="item.icon"></v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title v-text="item.title"></v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <span v-text="item.title"></span>
                    </v-tooltip>
                </template>
            </v-list>
             <v-divider></v-divider>
             <v-list subheader>
                <v-subheader>UTILITIES</v-subheader>
                <template v-for="item in utilitiesItems">
                    <v-tooltip right :disabled="!miniVariant">
                        <v-list-tile
                                :key="item.icon"
                                :to="item.link"
                                exact
                                slot="activator"
                        >
                            <v-list-tile-action>
                                <v-icon v-html="item.icon"></v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title v-text="item.title"></v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <span v-text="item.title"></span>
                    </v-tooltip>
                </template>
            </v-list>
        </v-navigation-drawer>
    


        <v-navigation-drawer
                temporary
                :right="right"
                v-model="rightDrawer"
                fixed
                app
        >
                <v-toolbar-title>Notifications</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click.stop="rightDrawer = false">
                    <v-icon>close</v-icon>
                </v-btn>
            </v-toolbar>
            <v-list subheader dense>
                <v-subheader>All notifications</v-subheader>
                <v-list-tile @click="">
                    <v-list-tile-action>
                        <v-icon>person_add</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>
                        12 new users registered
                    </v-list-tile-title>
                </v-list-tile>
                <v-divider></v-divider>
                <v-list-tile @click="">
                    <v-list-tile-action>
                        <v-icon>data_usage</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>
                        DB overloaded 80%
                    </v-list-tile-title>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
    <v-footer app >
        <v-toolbar
                flat
                dense
                color="primary"
                dark
        >
            <v-toolbar-side-icon
                    @click.stop="drawer = !drawer"
                    class="hidden-lg-and-up"
                    :class="searching ? 'hidden-xs-only' : ''"
            />
            <v-menu :nudge-width="100" :class="searching ? 'hidden-xs-only' : ''">
                <v-toolbar-title slot="activator" class="pl-2">
                    <span>{{ menuItems[0] }}</span>
                    <v-icon>local_phone</v-icon>
                </v-toolbar-title>
                <v-list>
                    <v-list-tile v-for="item in menuItems" :key="item" @click="">
                        <v-list-tile-title v-text="item"></v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>
            <v-spacer></v-spacer>

            <v-btn icon @click.native.stop="searchBegin">
                <v-icon>search</v-icon>
            </v-btn>
            <div :class="{'searching--closed': !searching}" class="searching">
                <v-text-field
                        id="search"
                        v-model="search"
                        append-icon="close"
                        label="Search"
                        hide-details
                        single-line
                        color="white"
                        @blur="onBlur"
                />
            </div>

            <v-tooltip bottom>
                <v-btn icon @click.stop="rightDrawer = !rightDrawer" slot="activator">
                    <v-badge color="red" overlap>
                        <span slot="badge">2</span>
                        <v-icon>notifications</v-icon>
                    </v-badge>
                </v-btn>
                <span>2 unread notifications</span>
            </v-tooltip>

            <v-menu
                    bottom
                    left
            >
                <v-btn icon slot="activator">
                    <v-avatar class="white" size="32">
                        <v-icon color="primary">person</v-icon>
                    </v-avatar>
                </v-btn>
                <v-list class="pa-0">
            <v-list-tile key="timeClock" @click="gotoClock">
                        <v-list-tile-action>
                            <v-icon>person</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Time Clock</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-divider></v-divider>                    
                    <v-list-tile key="profile" @click="gotoProfile">
                        <v-list-tile-action>
                            <v-icon>person</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Profile</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-divider></v-divider>

                    <v-list-tile key="lock_open" @click="signOut">
                        <v-list-tile-action>
                            <v-icon>lock_open</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>Logout</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-menu>
        </v-toolbar>
</v-footer  >
</template>


  <v-content>
    <router-view></router-view>
  </v-content>
  
  </div>
  </v-app>
</template>

<script>
import router from "../../router"
export default {
  data: () => ({
    x: "light",
    drawer: true,
    rightDrawer: false,
    searching: false,
    search: "",
    right: "",
    attributes: {},
    fixed: false,
    pr: { link: "/profile" },
    topItems: [
      {
        icon: "supervisor_account",
        title: "Employees",
        link: "/directory"
      },
      {
        icon: "supervisor_account",
        title: "Applicants",
        link: ""
      }
    ],
    middleItems: [
      {
        icon: "dashboard",
        title: "Dashboard",
        link: ""
      },
      {
        icon: "local_shipping",
        title: "Live View",
        link: "/liveview"
      },
      {
        icon: "book",
        title: "Schedule",
        link: "/schedule"
      }
    ],
    lastItems: [
      {
        icon: "android",
        title: "Hardware",
        link: "/hardware"
      },
      {
        icon: "invert_colors",
        title: "Consumables",
        link: "/consumables"
      }
    ],
    utilitiesItems: [
      {
        icon: "list",
        title: "Logs",
        link: ""
      },
      {
        icon: "work",
        title: "Documents",
        link: "/documents"
      },
      {
        icon: "comment",
        title: "Notifications",
        link: ""
      }
    ],
    miniVariant: false,

    tabs: null,
    tabsItems: [
      { id: 1, title: "Indicators", link: "indicators" },
      { id: 2, title: "Backup", link: "backup" },
      { id: 3, title: "Logs", link: "logs" }
    ],
    menuItems: ["", "NodeJS", "Laravel"]
  }),
  methods: {
    gotoClock() {
      this.$router.push("/timeClock")
    },

    gotoProfile() {
      this.$router.push("/profile")
    },
    onBlur() {
      this.searching = false
      this.search = ""
    },

    searchBegin() {
      this.searching = true
      setTimeout(() => document.querySelector("#search").focus(), 50)
    },

    searchEnd() {
      this.searching = false
      this.search = ""
      document.querySelector("#search").blur()
    },
    // navigate: function(path) {
    //   console.log("navigating to " + path);
    //   if (path === "signout") {
    //     this.$store.commit("signOut");
    //     router.push("/home");
    //   } else {
    //     router.push("/" + path);
    //   }
    // },
    signOut() {
      this.$router.push("/logout")
    },
    gotoProfile() {
      this.$router.push("/profile")
    },
    onBlur() {
      this.searching = false
      this.search = ""
    },
    searchBegin() {
      this.searching = true
      setTimeout(() => document.querySelector("#search").focus(), 50)
    },

    searchEnd() {
      this.searching = false
      this.search = ""
      document.querySelector("#search").blur()
    },

    beforeUpdate() {
      console.log("store.username: " + this.$store.state.username)
      var str = this.$store.state.username
      var index = str.indexOf("@")
      this.username = str.substring(0, index)
      // console.log(">>>>>", this.username);
      // if (router. !== "home" && !this.username) {
      //   this.$store.commit("signOut");
      //   router.push("/signin");
    }
  },
  computed: {
    isAuthenticated: function() {
      return this.$store.getters.isAuthenticated
    }
  }
}
</script>