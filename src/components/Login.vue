<template>
  <v-row width="auto" justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px" max-height="100%">
      <template v-slot:activator="{ on }">
        <v-row>
          <v-col style="padding:5px;">
            <v-btn text id="welcome-btn" small rounded v-show="isLogin">Welcome, {{usernameL}}</v-btn>
          </v-col>
          <v-col style="padding:0">
            <v-btn v-show="isLogin" outlined rounded dark @click="logout">Log out</v-btn>
          </v-col>
        </v-row>
        <v-btn v-show="!isLogin" outlined rounded dark v-on="on">Log In</v-btn>
      </template>
      <h1 class="white--text">Welcome! Please login</h1>
      <v-card color="rgba(255,255,255,0.95)">
        <v-form v-model="valid" ref="form1" :lazy-validation="lazy">
          <v-card-title>
            <span class="headline">Log In</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="username"
                    :rules="requiredRule"
                    label="Username*"
                    required
                    clearable
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="pass1"
                    :rules="requiredRule"
                    label="Password*"
                    :type="showpass ? 'text': 'password'"
                    :append-icon="showpass ? 'mdi-eye':'mdi-eye-off'"
                    @click:append="showpass = !showpass"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <div></div>
            <v-col>
              <v-row class="pa-2">
                <v-btn dark rounded color="orange" @click="login()" block :loading="loading">Login</v-btn>
              </v-row>
              <v-row justify="center" class="pa-2">
                <v-btn light rounded color="orange" block outlined @click="close">Close</v-btn>
              </v-row>
              <v-row class="pa-2">
                <Signup />
              </v-row>
              <v-row cols="12" class="pa-2">
                <v-btn rounded block outlined @click="loginAdmin()">Organization Portal</v-btn>
              </v-row>
              <v-row cols="12"></v-row>
            </v-col>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
import Signup from "./Signup";
export default {
  components: {
    Signup
  },
  data() {
    return {
      showpass: false,
      requiredRule: [v => !!v || "Input required"],
      lazy: false,
      valid: true,
      usernameL: "",
      dialog: false,
      username: "",
      pass1: "",
      loading: null,
      show: null,
      message: ""
    };
  },
  methods: {
    clear() {
      this.username = "";
      this.pass1 = "";
    },
    snackBar(text, color) {
      this.$store.commit("SET_SNACKBAR", {
        showing: true,
        text: text,
        color: color
      });
    },
    async cancel() {
      // let res =
       await this.$store.dispatch("callAPI", {
        send: {},
        branch: "/logout/",
        call: "DO_NOTHING",
        setData: {}
      });

    },
    async logout() {
      let res = await this.$store.dispatch("callAPI", {
        send: {},
        branch: "/logout/",
        call: "DO_NOTHING",
        setData: {}
      });
      console.log(res);
      if (res.code == "ok") {
        this.$store.commit("LOG_OUT", false);
        this.$store.commit("SET_SNACKBAR", {
          showing: true,
          text: "Log out successfully",
          color: "success"
        });

        setTimeout(this.$router.push("/"), 1000);
      } else {
        this.$store.commit("SET_SNACKBAR", {
          showing: true,
          text: "Error when logging out",
          color: "error"
        });
      }
    },
    usernameset() {
      this.usernameL = window.localStorage.getItem("username");
    },
    login() {
      if (this.$refs.form1.validate()) {
        this.submit();
      }
    },
    loginAdmin() {
      if (this.$refs.form1.validate()) {
        this.admin();
      }
    },
    async admin() {
      this.loading = true;
      let send = new FormData();
      send.append("username", this.username);
      send.append("password", this.pass1);
      let branch = "/login/";
      let call = "DO_NOTHING";
      let dataSend = {
        send: send,
        branch: branch,
        call: call,
        setData: {}
      };
      try {
        let res = await this.$store.dispatch("callAPI", dataSend);
        console.log(res);
        if (res.code == "ok") {
          if (res.is_staff != "true") {
            this.cancel();
            this.snackBar("Not Admin", "error");
          } else {
            this.$store.commit("SET_ADMIN_LOGIN", this.username);
            this.usernameset();

            this.snackBar("Login successfully", "success");
            this.$router.push("/admin/qr");
          }
        } else {
          this.snackBar("Login failed, Invalid login info", "error");
        }
      } catch {
        this.$store.dispatch("SET_SNACKBAR", {
          showing: true,
          text: "Login error",
          color: "error"
        });
      }
      this.loading = false;
      this.close();
    },
    async submit() {
      this.loading = true;
      let send = new FormData();
      send.append("username", this.username);
      send.append("password", this.pass1);
      let branch = "/login/";
      let call = "DO_NOTHING";
      let dataSend = {
        send: send,
        branch: branch,
        call: call,
        setData: {}
      };
      try {
        let res = await this.$store.dispatch("callAPI", dataSend);
        console.log(res);

        if (res.code == "ok") {
          if (res.is_staff == "true") {
            this.snackBar("Not user", "error");
            this.cancel();
          } else {
            this.$store.commit("SET_USER_LOGIN", this.username);
            this.usernameset();

            this.snackBar("Login successfully", "success");
            setTimeout(this.$router.push("/user/suggest"), 3000);
          }
        } else {
          this.snackBar("Login failed, Invalid login info", "error");
        }
      } catch {
          this.snackBar("Login error", "error");
      }
      this.loading = false;
      this.close();
    },
    sync() {
      this.dialog = this.dialog_login;
    },
    close() {
      this.$store.state.dialog_login = false;
      this.sync();
    },
    open() {
      this.$store.state.dialog_login = true;
      this.sync();
    }
  },
  computed: {
    ...mapState(["isLogin"])
  },
  mounted() {
    this.usernameset();
    this.sync();
  }
  // created() {
  //   this.$store.watch(
  //     state => state.isLogin,
  //     () => {
  //       this.isLogin = this.$store.state.isLogin;
  //     }
  //   );
  // }
};
</script>