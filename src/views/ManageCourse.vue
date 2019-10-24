<template>
  <v-container>
    <v-col>
      <v-row>
        <v-col cols="12" md="3" class="d-none d-md-block"></v-col>
        <v-col cols="12" md="6">
          <v-img src="../assets/organisor.png"></v-img>
        </v-col>
        <v-col cols="12" md="3" class="d-none d-md-block"></v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="1" class="d-none d-md-block"></v-col>
        <v-col cols="12" md="6">
          <!--  -->
          <v-row>
            <v-col
              cols="12"
              md="6"
              v-for="item in courses"
              :key="item.course_id"
              style="padding:0.25em"
            >
              <v-card height="120px" id="course-container" @click="find(item.course_id)">
                <v-row>
                  <v-col
                    v-bind:style="item.bgc"
                    class="date-part"
                    style="padding:0; margin-left:10px;"
                    cols="3"
                    align="right"
                  >
                    <div>
                      <br />
                      <h3>{{date1a(item.course_time)[2]}}</h3>
                      <h2>{{date1a(item.course_time)[1]}}</h2>
                    </div>
                  </v-col>
                  <v-col class="course-image" cols="3">
                    <v-img height="120px" max-width="120px" :src="item.src"></v-img>
                  </v-col>
                  <v-col cols="4" class="course-info">
                    <v-row>
                      <v-tooltip>
                        <span>{{item.course_name}}</span>
                      </v-tooltip>
                      <div class="course-name">{{item.course_name}}</div>
                    </v-row>
                    <v-row>
                      <span class="course-location">{{item.course_location}}</span>
                    </v-row>
                    <v-row>
                      <span class="course-time">{{date2a(item.course_time)}}</span>
                    </v-row>
                    <v-row style="margin-top:10px;">
                      <v-chip small color="orange">{{item.course_point}} Points</v-chip>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
          <!--  -->
        </v-col>
        <v-col cols="12" md="4">
          <v-container fluid style="padding:0">
            <v-card>
              <v-card-title>
                <h1>Create event</h1>
              </v-card-title>
              <v-overlay v-model="overlay" z-index="10000">Verifying, please wait...</v-overlay>
              <v-snackbar v-model="alert" top :color="color">
                <div>
                  <v-btn @click="alert = false" icon>
                    <v-icon>md-close-circle</v-icon>
                  </v-btn>
                  {{ alert_msg }}
                </div>
              </v-snackbar>
              <div class="pa-3" align="center">
                <div>
                  <v-text-field label="Course Id" v-model="course_id" v-show="add" disabled></v-text-field>
                  <v-text-field label="Course name" v-model="course_name"></v-text-field>
                  <!--  -->

                  <!--  -->
                  <v-text-field label="Course point" type="number" v-model="course_point"></v-text-field>
                  <v-text-field label="Course location" v-model="course_location"></v-text-field>
                  <v-text-field
                    label="Course duration"
                    type="number"
                    v-model="course_duration"
                    placeholder="Hour(s)"
                  ></v-text-field>
                  <!--  -->
                  <v-dialog
                    ref="menu1"
                    v-model="menu1"
                    :return-value.sync="course_d1"
                    persistent
                    width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="course_d1"
                        label="Pick a date"
                        prepend-inner-icon="mdi-calendar-range"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="course_d1" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
                      <v-btn text color="primary" @click="$refs.menu1.save(course_d1)">OK</v-btn>
                    </v-date-picker>
                  </v-dialog>
                  <!--  -->
                  <!--  -->
                  <v-dialog
                    ref="dialog2"
                    v-model="menu2"
                    :return-value.sync="course_t1"
                    persistent
                    width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="course_t1"
                        label="Pick a time"
                        prepend-inner-icon="mdi-clock"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker v-if="menu2" v-model="course_t1" min-width="290px" use-seconds>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
                      <v-btn text color="primary" @click="$refs.dialog2.save(course_t1)">OK</v-btn>
                    </v-time-picker>
                  </v-dialog>
                  <!--  -->

                  <v-textarea label="Course description" solo v-model="course_desc"></v-textarea>
                  <!-- <p>{{ this.getCourseToSend() }}</p> -->
                </div>
                <v-switch v-model="add" class="mx-2" label="Edit Mode"></v-switch>
                <!-- {{course_t1}} -->
                <v-btn
                  class="mr-1"
                  id="btn-refresh"
                  dark
                  color="rgb(231,113,51)"
                  outlined
                  @click="getCourses"
                >Refresh</v-btn>
                <v-btn
                  class="mr-1"
                  id="btn-create"
                  dark
                  color="blue"
                  outlined
                  @click="addCourse"
                  v-show="!add"
                >Create</v-btn>
                <v-btn
                  id="btn-modify"
                  class="mr-1"
                  dark
                  color="green"
                  outlined
                  @click="modifyCourse"
                  v-show="add"
                >Modify</v-btn>
              </div>
              <v-container class="pa-2" fluid></v-container>
            </v-card>
          </v-container>
        </v-col>
        <v-col class="d-none d-md-block" cols="12" md="1"></v-col>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      time: null,
      menu1: false,
      date1: "",
      menu2: false,
      modal2: false,
      date2: "",
      add: false,
      // alert: false,
      // alert_msg: "",
      // color: "yellow",
      course_name: "",
      course_id: "",
      course_time: this.course_d1 + " " + this.course_t1,
      course_d1: null,
      course_t1: null,
      // c_t1_holder: "pick a time",
      course_duration: "",
      course_location: "",
      course_point: "",
      course_desc: "",
      courseToSend: "",
      overlay: false,
      courses: [],
      pics: [
        {
          src: require("../assets/1-1.png")
        },
        {
          src: require("../assets/2-1.png")
        },
        {
          src: require("../assets/3-1.png")
        },
        {
          src: require("../assets/4-1.png")
        },
        {
          src: require("../assets/5-1.png")
        },
        {
          src: require("../assets/6-1.png")
        }
      ]
    };
  },
  methods: {
    moment,
    onChange(time, timeString) {
      // console.log(time, timeString)
      this.course_t1 = timeString;
    },
    date1a(str) {
      var temp = str.split(" ");
      var date = new Date(temp[0]);
      var ss = date.toString();
      var sss = ss.split(" ");
      // return sss[1] + " " + sss[2];
      return sss;
    },
    date2a(str) {
      var temp = str.split(" ");
      var date = new Date(temp[0]);
      var ss = date.toString();
      var sss = ss.split(" ");
      return sss[1] + " " + sss[2] + " " + sss[3];
    },
    colors(str) {
      var temp = str.split(" ");
      var date = new Date(temp[0]);
      var half = new Date("2019-06-30");
      if (date.getTime < half.getTime) {
        return "orange";
      }
      return "gray";
    },
    snackbarHint(text, color) {
      this.$store.commit("SET_SNACKBAR", {
        showing: true,
        text: text,
        color: color
      });
    },
    date11(str) {
      var temp = str.split(" ");
      var date = new Date(temp[0]);
      // console.log(date);
      var ss = date.toString();
      // console.log(ss);
      var sss = ss.split(" ");
      // console.log(sss[1]);
      return sss[1] + " " + sss[2];
    },
    showCourseInfo() {},
    getCourseToSend() {
      return (
        this.course_name +
        ";" +
        this.course_time +
        ";" +
        this.course_location +
        ";" +
        this.course_duration +
        ";" +
        this.course_point
      );
    },
    showAlert(color, msg) {
      this.color = color;
      this.alert_msg = msg;
      this.alert = true;
    },
    async getCourses() {
      // this.courses = [];
      this.overlay = true;

      try {
        let res = await this.$store.dispatch("callAPI", {
          send: {},
          branch: "/get_all_courses/",
          call: "DO_NOTHING",
          dataSet: {}
        });

        this.courses = res.courses;
        for (var i = 0; i < this.courses.length; i++) {
          this.courses[i].src = this.pics[i % 5].src;
        }
        this.overlay = false;
        this.snackbarHint("Courses loaded", "success");
      } catch {
        this.overlay = false;
        this.snackbarHint("fail to load courses", "error");
      }
      this.overlay = false;
    },
    find(id) {
      if (!this.add) {
        return;
      }
      let course = this.courses.find(c => c.course_id == id) || {};
      this.course_id = id;
      this.course_name = course.course_name;
      let date = course.course_time.split(" ");

      this.course_d1 = date[0];
      this.course_t1 = date[1];
      // this.c_t1_holder = date[1];
      this.course_point = course.course_point;
      this.course_location = course.course_location;
      this.course_duration = course.course_duration;
      this.course_desc = course.course_desc;
      this.snackbarHint(`Course [${this.course_name}] selected`, "success");
    },
    async addCourse() {
      let dataSent = new FormData();
      dataSent.append("course_name", this.course_name);
      dataSent.append("course_time", this.course_d1 + " " + this.course_t1);
      dataSent.append("course_location", this.course_location);
      dataSent.append("course_point", this.course_point);
      dataSent.append("course_duration", this.course_duration);
      dataSent.append("course_desc", this.course_desc);

      try {
        let res = await this.$store.dispatch("callAPI", {
          send: dataSent,
          branch: "/add_course/",
          call: "DO_NOTHING",
          dataSet: {}
        });
        this.course_t1 = null;
        this.overlay = false;
        if (res.code == "1") {
          this.snackbarHint("Courses added", "success");
          this.getCourses();
        } else {
          this.snackbarHint("failed adding course", "error");
        }
      } catch {
        this.overlay = false;
        this.snackbarHint("fail", "error");
      }
      this.overlay = false;
    },
    async modifyCourse() {
      let dataSent = new FormData();
      dataSent.append("course_id", this.course_id);
      dataSent.append("course_name", this.course_name);
      dataSent.append("course_time", this.course_d1 + " " + this.course_t1);
      dataSent.append("course_location", this.course_location);
      dataSent.append("course_point", this.course_point);
      dataSent.append("course_duration", this.course_duration);
      dataSent.append("course_desc", this.course_desc);

      try {
        let res = await this.$store.dispatch("callAPI", {
          send: dataSent,
          branch: "/modify_course/",
          call: "DO_NOTHING",
          dataSet: {}
        });

        this.overlay = false;
        this.course_t1 = null;
        if (res.code == "1") {
          this.snackbarHint("Courses modified", "success");
          this.getCourses();
        } else {
          this.snackbarHint("failed modifying course", "error");
        }
      } catch {
        this.overlay = false;
        this.snackbarHint("fail", "error");
      }
      this.overlay = false;
    }
  },
  computed: {},
  mounted() {
    this.getCourses();
  }
};
</script>

<style scoped>
h2 {
  text-transform: uppercase;
}
.course-name {
  max-width: 100%;
  word-break: keep-all;
  line-break: normal;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-height: 2em;
}
.date-part {
  text-justify: distribute-all-lines;
  justify-items: center;
  align-items: center;
  color: gray;
  max-width: 120px;
  height: 120px;
  background-color: orange;
  overflow: hidden;
  text-align: center;
  padding: 0 !important;

  border-radius: 15px 0 0 15px;
}
.course-location {
  font-size: 12px;
  color: gray;
}
.course-time {
  height: 1em;
  color: gray;
  font-size: 12px;
  text-align: center;
}
.course-image {
  padding: 0 !important;
}
#course-container {
  padding: 0;
  border-radius: 15px;
}
.course-info {
  padding: 0;
  background-color: white;
  margin-left: 1.25em;
  max-width: auto;
  height: 120px;
  justify-content: center;
  align-self: center;
  align-content: center;
  /* min-width: 125px; */
}
.my-container {
  border-radius: 15px;
  border-width: 2px;
  border-color: aquamarine;
}
#btn-refresh,
#btn-create,
#btn-modify {
  width: 120px;
  margin: 5px;
}
</style>