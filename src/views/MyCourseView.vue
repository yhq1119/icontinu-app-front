<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="3"></v-col>
      <v-col cols="12" md="6">
        <div id="qrCodingBox">
          <h1>Course QR Code</h1>
          <v-card outlined id="qr-card">
            <v-col>
              <v-row>
                <v-col>
                  <div id="qrcode" ref="qrcode"></div>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <div>
                    <v-chip id="hint">SCAN YOUR CODE</v-chip>
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </v-card>
          <!--  -->
          <v-dialog v-model="dialog.showing" width="300">
            <v-card color="rgba(255,255,255,0.90)" style="padding:20px">
              <v-card-text>
                <h2>{{dialog.text}}</h2>
              </v-card-text>
              <v-btn color="orange" large dark @click="dialog.showing = false">OK</v-btn>
              <div class="flex-grow-1" justify="center"></div>
            </v-card>
          </v-dialog>
          <!--  -->
          <!-- <el-button type="primary" @click="goRec">Facial Recognition</el-button> -->
        </div>
      </v-col>
      <v-col cols="12" md="3"></v-col>
    </v-row>
  </v-container>
</template>

<script>
import QRCode from "qrcodejs2";
export default {
  name: "qrcoding",
  data() {
    return {
      course_id: "",
      isScanned: false,
      id: "",
      dialog: {
        showing: true,
        title: "",
        text: "Please show this code to the organisor."
      }
    };
  },
  computed: {},
  mounted() {
    this.course_id = this.$route.params.id;
    this.qrcode();
    this.acvtiveQRCode();
    this.timer = setInterval(this.queryStatus, 5000);
  },
  beforeRouteLeave(to, from, next) {
    clearInterval(this.timer);
    next();
  },
  methods: {
    qrcode() {
      let qr = document.getElementById("qrcode");
      this.id = this.course_id + new Date().getMilliseconds();
      console.log(this.id);
      let qrcode = new QRCode(qr, {
        width: 250,
        height: 250,
        text: `{"course":"${this.course_id}",
        "username":"${window.localStorage.getItem("username")}",
          "id": "${this.id}"}`,
        background: "#f0f",
        foreground: "#ff0"
      });
      console.log(qrcode);
    },
    goRec() {
      this.$router.push({
        name: "face scan",
        params: { id: this.course_id }
      });
    },
    async queryStatus() {
      let data = new FormData();
      data.append("id", this.id);

      let res = await this.$store.dispatch("callAPI", {
        send: data,
        branch: "/check_qr/",
        call: "DO_NOTHING",
        setData: {}
      });
      if (res.code == "scanned") {
        let send_data = new FormData();
        // send_data.append("username", window.localStorage.getItem("username"));
        send_data.append("course_id", this.course_id);
        let res = await this.$store.dispatch("callAPI", {
          send: send_data,
          branch: "/user_pass_qr/",
          call: "DO_NOTHING",
          setData: {}
        });
        if (res.code == "1") {
          this.$store.commit("SET_SNACKBAR", {
            showing: true,
            text: "Successfully verified QR code",
            color: "success"
          });
          this.goRec();
        } else {
          this.$store.commit("SET_SNACKBAR", {
            showing: true,
            text: res.message,
            color: "error"
          });
        }
      }
    },
    async acvtiveQRCode() {
      // let data = new FormData();
      let res = await this.$store.dispatch("callAPI", {
        send: {},
        branch: "/active_qr/",
        call: "DO_NOTHING",
        setData: {}
      });
      if (res.code == "true") {
        console.log(res.message);
      }
    }
  },
  created() {},
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>

<style lang="scss" scoped>
#qrCodingBox {
  text-align: center;
}
#qrcode {
  padding-left: calc(50% - 125px);
  padding-top: 50px;
}
#qr-card {
  padding: 0 0 50px 0;
  border-radius: 50px;
  border-color: #e3d0ff;
}
#hint {
  background-color: rgb(238, 175, 97);
  color: #5c6ac4;
}
</style>
