<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer v-model="drawer" app>
        <!-- -->
        <v-divider></v-divider>
        <v-list-item style="height:80px;" to="/" @click="drawer=false">
          <v-list-item-content style="height:90px;">
            <v-list-item-title id="title">
              <!-- <v-btn icon to="/"> -->
              <v-avatar id="avater" rounded large>
                <v-img src="./assets/logo-i.png" contain></v-img>
              </v-avatar>
              <!-- </v-btn> -->
            </v-list-item-title>
            <v-list-item-subtitle>iCONTINU</v-list-item-subtitle>
            <!-- <v-list-item-subtitle v-if="showName()">username</v-list-item-subtitle> -->
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list v-for="item in barItems" :key="item.index">
          <v-list-item v-if="showItem(item.admin)" justify-self="center" :to="item.link">
            <v-col align="center" cols="4">
              <v-icon>{{item.icon}}</v-icon>
            </v-col>
            <v-col align="left" cols="8">{{item.title}}</v-col>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
      </v-navigation-drawer>

      <v-app-bar app dark :color="nav_color">
        <!-- -->
        <v-btn v-if="responsive" @click="drawer=!drawer" icon>
          <v-icon>mdi-menu</v-icon>
        </v-btn>
        <v-btn icon to="/">
          <v-img src="./assets/logo-i.png" height="3em" width="2em"></v-img>
        </v-btn>
        <v-toolbar-items v-if="!responsive">
          <v-toolbar-items v-for="item in barItems" :key="item.index">
            <v-btn v-if="showItem(item.admin)" text :to="item.link">{{item.title}}</v-btn>
          </v-toolbar-items>
        </v-toolbar-items>

        <span class="title ml-3 mr-5">
          &nbsp;
          <span class="font-weight-light"></span>
        </span>
        <!-- <v-text-field
          v-if="!responsive"
          solo-inverted
          flat
          hide-details
          label="Search"
          prepend-inner-icon="mdi-magnify"
        ></v-text-field>-->
        <div class="flex-grow-1"></div>

        <div style="margin-right:20px;">
          <Login />
        </div>
      </v-app-bar>

      <v-snackbar v-model="snackbar.showing" :timeout="6000" top vertical :color="snackbar.color">
        {{snackbar.text}}
        <v-btn text @click="snackbar.showing=false">Close</v-btn>
      </v-snackbar>
      <!-- Sizes your content based upon application components -->
      <v-content>
        <!-- Provides the application the proper gutter -->
        <v-container fluid>
          <!-- If using vue-router -->
          <router-view></router-view>
        </v-container>
      </v-content>

      <v-footer app class>
        <!-- -->
        <v-row>
          <v-divider class="d-none d-md-block"></v-divider>
          <v-col cols="3" md="1" width="200px">
            <a href="#/policy">Privacy</a>
          </v-col>
          <v-col cols="3" md="1">
            <a href="https://www.linkedin.com">LinkedIn</a>
          </v-col>
          <v-col cols="3" md="1">
            <a href="https://www.facebook.com">Facebook</a>
          </v-col>
          <v-col cols="3" md="1" align="center">
            <span class="font-weight-light copyright">
              &copy;
              {{ (new Date()).getFullYear() }}
              <!-- <a href="#" target="_blank">Creative by RMIT students</a> -->
            </span>
          </v-col>
        </v-row>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import Login from "./components/Login";
import { mapState } from "vuex";
export default {
  components: {
    Login
  },
  data() {
    return {
      responsive: false,
      nav_color1: "black",
      nav_color: "#DE5900",
      nav_color2: "#5c6ac4",
      drawer: false
    };
  },
  methods: {
    checkLogin() {
      this.$store.dispatch("callAPI", {
        send: {},
        branch: "/authenticate/",
        call: "DO_NOTHING",
        setData: {}
      });
    },
    onResponsive() {
      // console.log("Resized");
      if (window.innerWidth < 991) {
        this.responsive = true;
      } else {
        this.responsive = false;
        this.drawer = false;
      }
    },
    showItem(admin) {     
      if (this.isAdmin) {
        if (admin) {
          return true;
        } else {
          return false;
        }
      } else {
        if (admin) {
          return false;
        } else {
          return true;
        }
      }
    }
  },
  computed: {
    ...mapState(["snackbar", "barItems", "isAdmin", "isLogin"]),
    // showName(){
    //   return window.localStorage.getItem('username') == undefined
    // }
    
  },
  mounted() {
    this.$store.dispatch("set_courses", {});
    this.checkLogin();
    this.onResponsive();
    window.addEventListener("resize", this.onResponsive);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResponsive);
  }
};
</script>

<style lang="scss">
#avatar {
  padding: 5px;
  margin-top: 15px !important;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #5c6ac4;
}

a {
  padding: 1em;
}
</style>
