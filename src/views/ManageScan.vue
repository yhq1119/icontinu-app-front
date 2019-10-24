<template>
<v-row>
  <v-col cols="12" md="2"> </v-col>
  <v-col cols="12" md="8">
<v-overlay v-model="overlay" z-index="10000">Verifying, please wait...</v-overlay>
    <div>
      <h1>QR CODE SCAN</h1>
    </div>
    <v-card outlined class="pa-2">
      <div class="ma-1">
        <qrcode-stream @decode="onDecode" @init="onInit" />
      </div>
      <div class="ma-1">
        <v-btn id="submitbtn" color="rgb(231,113,51)" dark @click="refresh">Refresh</v-btn>
      </div>
    </v-card>
    <div class="text-center">
      <canvas id="canvas" width="640" height="480" style="display: none;"></canvas>
    </div>
  </v-col>
  <v-col cols="12" md="2">  </v-col>
</v-row>
</template>

<script>
import { QrcodeStream } from "vue-qrcode-reader";
export default {
  components: {
    QrcodeStream
  },
  data() {
    return {
      overlay: false
    };
  },
  methods: {
    open(title, color) {
      this.$store.commit("SET_SNACKBAR", {
        showing: true,
        text: title,
        color: color
      });
    },
    refresh() {
      location.reload();
    },
    async verifyQR(obj) {
      let send = new FormData();
      send.append("username", obj.username);
      send.append("course_id", obj.course);
      // console.log(send.get('username'))
      // console.log(send.get('course_id'))
      let res = await this.$store.dispatch("callAPI", {
        send: send,
        branch: "/verify_user_enrollment/",
        call: "DO_NOTHING",
        setData: {}
      });
      if (res.code == "1") {
        this.open(res.message, "success");
        this.callFacePage(obj);
      } else {
        this.open(res.message, "error");
      }
    },
    async callFacePage(obj) {
      let send = new FormData();
      send.append("id", obj.id);
      this.overlay = true;

      let res = await this.$store.dispatch("callAPI", {
        send: send,
        branch: "/scan_qr/",
        call: "DO_NOTHING",
        setData: {}
      });
      this.overlay = false;
      if (res.code == "scanning") {
        this.open(
          res.message + " [code:" + res.code + "]",
          "success"
        );
        window.setTimeout(this.tellParrent, 1000 * 3);
        // this.tellParrent();
      } else {
        this.open(res.message + " [code:" + res.code + "]", "error");
      }
    },
    async onDecode(str) {
      if (str.length == 0) {
        this.refresh();
      }
      // console.log(str);

      let obj;
      try {
        obj = JSON.parse(str);
        if (obj.id == undefined) {
          this.open("Please show valid QR code", "error");
          return;
        }
        // console.log(obj.id);
      } catch {
        this.open("Please show valid QR code", "error");
        return;
      }

      this.verifyQR(obj);
    },
    goFaceScan() {
      this.$stores.dispatch("isQR_Verfied");
    },
    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.error = "ERROR: you need to grant camera access permisson";
        } else if (error.name === "NotFoundError") {
          this.error = "ERROR: no camera on this device";
        } else if (error.name === "NotSupportedError") {
          this.error = "ERROR: secure context required (HTTPS, localhost)";
        } else if (error.name === "NotReadableError") {
          this.error = "ERROR: is the camera already in use?";
        } else if (error.name === "OverconstrainedError") {
          this.error = "ERROR: installed cameras are not suitable";
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error = "ERROR: Stream API is not supported in this browser";
        }
      }
    }
  }
};
</script>