<template>
  <v-container id="userInfoBox" style="width:auto;padding:6px"  justify='center'>
    <v-row>
<v-col cols="12" md="3"></v-col>
    <v-col cols="12" md="6" align='center'> 
      <div id="userInfo" width="400px!important">
        <v-row>
          <v-col>
            <h1>Profile</h1>
            <v-form ref="form" label-width="188px">
              <!-- <v-form-item> -->
                <v-text-field outlined v-model="userInfo.first_name" label="First Name"></v-text-field>
              <!-- </v-form-item> -->
              <!-- <v-form-item> -->
                <v-text-field outlined v-model="userInfo.last_name" label="Last Name"></v-text-field>
              <!-- </v-form-item> -->
              <!-- <v-form-item> -->
                <v-text-field outlined v-model="form.phoneNum" label="Phone Number"></v-text-field>
              <!-- </v-form-item> -->
              <!-- <v-form-item> -->
                <v-text-field outlined v-model="userInfo.email" label="Email Address"></v-text-field>
              <!-- </v-form-item> -->
              <!-- <v-form-item> -->
                <v-text-field outlined v-model="form.regNum" label="Registration Number"></v-text-field>
              <!-- </v-form-item> -->
              <!-- <v-form-item> -->
                <v-text-field outlined v-model="form.ACD" label="Annual Certificate Date"></v-text-field>
              <!-- </v-form-item> -->
              <!-- <v-form-item> -->
                <v-text-field
                  outlined
                  v-model="form.iPolicyNum"
                  label="Insurance Policy Number"
                ></v-text-field>
              <!-- </v-form-item> -->
            </v-form>
          </v-col>
        </v-row>
        <v-btn to="/" dark color="orange">Save</v-btn>
      </div>
    </v-col>
    <v-col cols="12" md="3"></v-col>
  
    </v-row>
    </v-container>
</template>

<script>
export default {
  name: "userInfo",
  data() {
    return {
      userInfo: {},
      form: {
        firstName: "",
        lastName: "",
        phoneNum: "041-117-2222",
        email: "",
        regNum: 'N9TT-9G0A-B7FQ-RANC',
        ACD: 'Every 15th of January',
        iPolicyNum: '6ETI-UIL2-9WAX-XHYO'
      }
    };
  },
  methods: {
    async getUserInfo() {
      let send = new FormData();
      send.append("username", window.localStorage.getItem("username"));
      let branch = "/profile/";
      let call = "DO_NOTHING";
      let setData = {};

      let sendData = {
        send: send,
        branch: branch,
        call: call,
        setData: setData
      };

      let res = await this.$store.dispatch("callAPI", sendData);
      this.userInfo = res;
    }
  },
  computed: {},
  mounted() {
    this.getUserInfo()
  }
};
</script>

<style lang='scss' scoped>
</style>
