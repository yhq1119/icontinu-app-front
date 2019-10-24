<template>
  <v-container id="userInfoBox" style="width:auto;padding:6px" justify="center">
    <v-row>
      <v-col cols="12" md="3"></v-col>
      <v-col cols="12" md="6" align="center">
        <v-layout column>
          <v-flex>
            <v-flex align-self-center>
              <h1>Payment</h1>
            </v-flex>
          </v-flex>
          <v-flex class="pa-2">
            <v-card>
              <v-layout row>
                <v-flex class="pa-2">
                  <v-img width="6em" height="6em" src="../assets/logo-i.png"></v-img>
                </v-flex>
                <v-flex align-self-center>
                  <span>{{fullname}}</span>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
          <v-flex class="pa-2">
            <v-card class="pa-4">
              <v-layout column>
                <v-flex>
                  <v-text-field label="Name:" v-model="fullname" placeholder></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field label="Email:" v-model="userInfo.email" placeholder></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field label="Profession:" v-model="sample.profession" placeholder></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field label="Employer:" v-model="sample.employer" placeholder></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field label="Mobile No.:" v-model="sample.mobileNum" placeholder></v-text-field>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
          <v-flex class="pa-2">
            <v-card class="pa-4">
              <v-layout column>
                <v-flex>
                  <v-text-field label="Registration No.:" v-model="sample.regNum"></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field label="Annual Certificate Date:" v-model="sample.ACD"></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field label="Insurance Policy No.:" v-model="sample.IPN"></v-text-field>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
          <v-flex class="pa-2">
            <v-card class="pa-4">
              <v-layout row justify-space-between>
                <v-flex>MY QR CODE</v-flex>
                <v-flex>
                  <v-img height="3em" width="3em" src="../assets/qr-sm.png"></v-img>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
          <v-flex class="pa-2">
            <v-card class="pa-4">
              <v-layout column>
                <!--  -->
                <v-flex>Credit Card / Payment Details</v-flex>

                <v-flex>
                  <v-layout row>
                    <v-flex xs1>
                      <v-img src="../assets/AE1.png"></v-img>
                    </v-flex>
                    <v-flex xs1>
                      <v-img src="../assets/VISA1.png"></v-img>
                    </v-flex>
                    <v-flex xs1>
                      <v-img src="../assets/MC1.png"></v-img>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex>
                  <v-img src="../assets/VISA2.png"></v-img>
                </v-flex>
                <v-flex>
                  <v-text-field label="Cardholder:" placeholder v-model="sample.cardHolder"></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field label="Card Number:*" placeholder v-model="sample.cardNum"></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field label="Expiry Date:*" placeholder v-model="sample.expDate"></v-text-field>
                </v-flex>
                <v-flex>
                  <v-layout row justify-center>
                    <v-flex xs2>
                      <v-text-field label="CVC:" placeholder type="password" v-model="sample.CVV"></v-text-field>
                    </v-flex>
                    <v-flex xs7></v-flex>
                    <v-flex xs2>
                      <v-img src="../assets/widge-1.png"></v-img>
                    </v-flex>
                  </v-layout>
                </v-flex>

                <!--  -->
              </v-layout>
            </v-card>
            <v-flex class="ma-4">
              <v-btn to="/" dark color="orange">save</v-btn>
            </v-flex>
          </v-flex>
        </v-layout>
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
      sample: {
        first_name:"first_name",
        last_name:'last_name',
        name: "Sample Name",
        email: "sample@sample.com",
        profession: "Sample Profession",
        employer: "iCONTINU",
        mobileNum: "042-250-64007",

        regNum: "N9TT-9G0A-B7FQ-RANC",
        ACD: "Every 15th of January",
        IPN: "6ETI-UIL2-9WAX-XHYO",

        cardHolder: "Sample Sample",
        cardNum: "**** **** **** 8871",
        expDate: "02/22",
        CVV: "***"
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
  computed: {
     fullname(){
      return this.userInfo.first_name+" "+this.userInfo.last_name
    }
  },
  mounted() {
    this.getUserInfo();
  }
};
</script>

<style lang='scss' scoped>
</style>
