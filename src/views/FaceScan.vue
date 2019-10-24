<template>
  <div align="center">
    <v-overlay v-model="overlay" z-index="10000">Verifying, please wait...</v-overlay>
    <v-row>
      <v-col cols="12" md="2"></v-col>
      <v-col cols="12" md="8">
        <v-row>
          <v-col>
            <div>
              <h1 id="header1">Face Verification</h1>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6" class="d-none d-md-block">
            <v-card outlined id="left-card">
              <v-img height="100%" src=../assets/facescan.png>
              </v-img>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card outlined id="face-scan-card">
              <v-row>
                <v-col>
                  <!--  -->
                  <v-row>
                    <v-col>
                      <div>
                        <vue-web-cam
                          ref="webcam"
                          :device-id="deviceId"
                          width="100%"
                          @started="onStarted"
                          @stopped="onStopped"
                          @error="onError"
                          @cameras="onCameras"
                          @camera-change="onCameraChange"
                        />
                      </div>
                    </v-col>
                  </v-row>
                  <!--  -->
                  <v-row>
                    <v-col>
                      <v-btn
                        id="submitbtn"
                        @click="onCapture"
                        color="rgb(231,113,51)"
                        dark
                        block
                      >Capture Face</v-btn>
                    </v-col>
                  </v-row>
                  <!--  -->
                  <v-row>
                    <v-col>
                      <div class="text-center">
                        <v-menu offset-y>
                          <template v-slot:activator="{ on }">
                            <v-btn block color="orange" dark v-on="on" outlined>CHOOSE CAMERA</v-btn>
                          </template>
                          <v-list>
                            <v-list-item
                              v-for="item in devices"
                              :key="item.deviceId"
                              @click="camera = item.deviceId"
                            >
                              <v-list-item-title>{{ item.label }}</v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-menu>
                      </div>
                    </v-col>
                  </v-row>
                  <!--  -->
                  <v-row>
                    <v-col>
                      <v-switch v-model="showCamera" @change="toggle_camera" label="Camera on/off"></v-switch>
                    </v-col>
                  </v-row>
                  <!--  -->
                  <!--  -->
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="2"></v-col>
    </v-row>
    <div align="center">
      <canvas id="draw" style="display: none;" />
    </div>
  </div>
</template>

<script>
// import axios from "axios";
import WebCam from "../components/WebCam";
import { mapState } from "vuex";
export default {
  name: "verify",
  components: {
    "vue-web-cam": WebCam
  },
  data() {
    return {
      showCamera: true,
      course_id: "",
      overlay: false,
      img: null,
      camera: null,
      deviceId: null,
      devices: []
    };
  },
  mounted() {
    this.course_id = this.$route.params.id;
    this.hint();
    this.getCompetence();
  },
  computed: {
    ...mapState(["username"]),

    device() {
      return this.devices.find(n => n.deviceId === this.deviceId);
    }
  },
  watch: {
    camera: function(id) {
      this.deviceId = id;
    },
    devices: function() {
      // Once we have a list select the first one
      const [first, ...tail] = this.devices;
      if (first) {
        this.camera = first.deviceId;
        this.deviceId = first.deviceId;
      }
    }
  },
  methods: {
    toggle_camera() {
      if (this.showCamera) {
        this.onStart();
      } else {
        this.onStop();
      }
    },
    snackBar(text, color) {
      this.$store.commit("SET_SNACKBAR", {
        showing: true,
        text: text,
        color: color
      });
    },
    async onCapture() {
      this.overlay = true;
      this.img = this.$refs.webcam.capture();
      let file = this.dataURLtoFile(this.img, "taken");
      console.log(file);
      let res = await this.$store.dispatch("callAzure", file);
      console.log(res);

      if (res.length == 0) {
        this.snackBar("No face detected!", "warning");
        this.overlay = false;
      } else if (res.length == 1) {
        this.callBackend(res[0].faceId);
      } else {
        this.snackBar("More than one face, please capture again", "warning"); 
        this.overlay = false;
      }
     
    },
    async callBackend(faceId) {
      let dataSend = new FormData();

      dataSend.append("username", this.username);
      dataSend.append("course_id", this.course_id);
      dataSend.append("face_id", faceId);
      let res = await this.$store.dispatch("callAPI", {
        send: dataSend,
        branch: "/verification/",
        call: "DO_NOTHING",
        setData: {}
      });
      this.overlay = false;
      if (res.code == "1") {
        let res1 = await this.$store.dispatch("callAPI", {
          send: dataSend,
          branch: "/user_pass_face/",
          call: "DO_NOTHING",
          setData: {}
        });
       
        if (res1.code == "1") {
          this.snackBar("Face verification passed!", "success");
          this.$refs.webcam.stop();
          this.$router.push({ path: "/" });
          
        }
        else{this.snackBar("Face verification failed! Incorrect course", "error");
        }
      } else {
        this.snackBar("Face verification failed!", "error");
      }
    },
    dataURLtoFile(dataURL, filename) {
      var arr = dataURL.split(",");
      var mime = arr[0].match(/:(.*?);/)[1];
      var bstr = atob(arr[1]);
      var n = bstr.length;
      var u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
    onStarted(stream) {
      console.log("On Started Event", stream);
    },
    onStopped(stream) {
      console.log("On Stopped Event", stream);
    },
    onStop() {
      this.snackBar("Camera stopped", "success");

      this.$refs.webcam.stop();
    },
    onStart() {
      this.snackBar("Camera opened", "success");
      this.$refs.webcam.start();
    },
    onError(error) {
      console.log("On Error Event", error);
    },
    onCameras(cameras) {
      this.devices = cameras;
      console.log("On Cameras Event", cameras);
    },
    onCameraChange(deviceId) {
      this.deviceId = deviceId;
      this.camera = deviceId;
      console.log("On Camera Change Event", deviceId);
    }
  }
};
</script>
<style scoped>
#left-card {
  padding: 2em;
  height: 100%;
  border-radius: 30px;
  border-color: #e3d0ff;
}

#face-scan-card {
  padding: 2em;
  border-radius: 30px;
  border-color: #e3d0ff;
}
#header1 {
  color: #5c6ac4;
}
</style>
