<template>
  <v-row justify="center">
    <!--  -->

    <!--  -->
    <v-dialog v-model="dialog" persistent max-width="600px" max-height="100%">
      <v-dialog v-model="dialogs.showing" max-width="500px">
        <v-card color="rgba(255,255,255,0.75)" style="padding:20px">
          <v-card-text>
            <h6>{{dialogs.text}}</h6>
          </v-card-text>
          <v-row align="center" justify="center" class="pa-2 ma-2">
            <!-- <v-col> -->
            <v-btn color="grey" class="ma-2" small @click="dialogs.showing = false">yes, I agree</v-btn>
            <!-- </v-col> -->
            <!-- <v-col> -->
            <v-btn
              color="grey"
              class="ma-2 orange--text text--darken-1"
              small
              @click="goPolicy()"
            >For more details</v-btn>
            <!-- </v-col> -->
          </v-row>

          <div class="flex-grow-1" justify="center"></div>
        </v-card>
      </v-dialog>

      <template v-slot:activator="{ on }">
        <v-btn light v-on="on" color="blue" @click="clear" text>No account? Sign up</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Sign up</span>
        </v-card-title>
        <v-card-text>
          <v-form v-model="valid1" ref="form2" :lazy-validation="lazy1">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="username"
                    label="Username*"
                    :rules="[rules.required]"
                    required
                    clearable
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="first_name"
                    label="First name*"
                    :rules="[rules.required]"
                    required
                    clearable
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Last name*"
                    v-model="last_name"
                    :rules="[rules.required]"
                    required
                    clearable
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="email"
                    :rules="[rules.email]"
                    label="Email*"
                    clearable
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="pass1"
                    label="Password*"
                    :rules="[rules.same]"
                    required
                    :append-icon="showPass1 ? 'mdi-eye': 'mdi-eye-off'"
                    @click:append="showPass1 = !showPass1"
                    :type="showPass1 ? 'text': 'password'"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    :append-icon="showPass2 ? 'mdi-eye': 'mdi-eye-off'"
                    @click:append="showPass2 = !showPass2"
                    :type="showPass2 ? 'text': 'password'"
                    v-model="pass2"
                    :rules="[rules.same]"
                    label="Password (Repeat)*"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-col>
            <v-row class="pa-2">
              <v-btn color="orange" dark block :loading="loading" rounded @click="sub1()">Sign Up</v-btn>
            </v-row>
            <v-row class="pa-2">
              <v-btn color="orange" light block rounded outlined @click="dialog = false">Close</v-btn>
            </v-row>
          </v-col>
        </v-card-actions>
        <!--  -->
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      showPass1: false,
      showPass2: false,

      valid1: true,
      lazy1: false,
      dialog: false,
      dialogs: {
        showing: false,
        text:
          "I, consent to the transfer of my training professional development history including my personal data & biometerics to approved third parties as specified in use of ICONTINU"
      },
      loading: false,
      username: "",
      pass1: "",
      pass2: "",
      first_name: "",
      last_name: "",
      email: "",
      rules: {
        same: value => value === this.pass2 || "Password not same.",
        required: value => !!value || "Require input.",
        counter: value => value.length <= 20 || "Max 20 characters",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        }
      }
    };
  },
  methods: {
    goPolicy() {
      this.dialog = false;
      this.dialogs.showing = false;
      this.$router.push({ path: "/policy" });
      location.reload();
    },
    clear() {
      (this.dialogs.showing = true), (this.username = "");
      this.first_name = "";
      this.last_name = "";
      this.email = "";
      this.pass1 = "";
      this.pass2 = "";
    },
    sub1() {
      if (this.$refs.form2.validate()) {
        this.register();
      }
    },
    async register() {
      let send = new FormData();
      send.append("username", this.username);
      send.append("first_name", this.first_name);
      send.append("last_name", this.last_name);
      send.append("email", this.email);
      send.append("password", this.pass1);
      let branch = "/register/";
      let call = "DO_NOTHING";
      let dataSend = {
        send: send,
        branch: branch,
        call: call
      };
      this.loading = true;
      let res = await this.$store.dispatch("callAPI", dataSend);
      console.log(res);
      this.loading = false;
      if (res.code == "ok") {
        this.$store.commit("SET_SNACKBAR", {
          showing: true,
          text: "Registered successfully!",
          color: "success"
        });
        this.dialog = false;
        location.reload();
      } else {
        this.$store.commit("SET_SNACKBAR", {
          showing: true,
          text: res.message,
          color: "error"
        });
      }
    }
  }
};
</script>