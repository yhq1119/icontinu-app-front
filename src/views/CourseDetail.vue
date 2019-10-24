<template>
  <v-container id="course-info-container">
    <v-col>
      <v-row>
        <v-col>
          <v-row>
            <v-col cols="12" md="1" xl="2"></v-col>
            <v-col cols="12" md="7" xl="6">
              <v-row>
                <v-col style="text-align:left">
                  <h1>Course Introduction</h1>
                </v-col>
              </v-row>
              <v-card outlined id="info-card">
                <!--  -->
                <v-row>
                  <v-col style="text-align:left">
                    <h2 id="intro2">Introduction</h2>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6" style="text-align:left">
                    <!--  -->
                    <ul>
                      <li>What is {{course.course_name}}</li>
                      <li>What are {{course.course_name}} principles</li>
                      <li>{{course.course_name}} business behaviour</li>
                      <li>Breif history of {{course.course_name}}</li>
                      <li>{{course.course_name}} in research</li>
                      <li>Description of {{course.course_name}}: {{course.course_desc}}</li>
                    </ul>
                    <!--  -->
                  </v-col>
                  <v-col cols="12" md="6" style="text-align:left">
                    <!--  -->
                    <ul>
                      <li>Name: {{course.course_name}}</li>
                      <li>Time: {{course.course_time}}</li>
                      <li>Point(s): {{course.course_point}}</li>
                      <li>Duration: {{course.course_duration}} hour(s)</li>
                      <li>Location: {{course.course_location}}</li>
                    </ul>
                    <!--  -->
                  </v-col>
                </v-row>
                <!--  -->
              </v-card>
            </v-col>
            <v-col cols="12" md="3">
              <v-row class="d-none d-md-block">
                <v-img style="padding:12px" src="../assets/eroll-logo.png"></v-img>
              </v-row>
              <v-row>
                <!--  -->
                <v-dialog v-model="dialog.show" persistent max-width="340px" min-height="500px">
                  <template justify="center" v-slot:activator="{ on }">
                    <v-col>
                      <v-row>
                        <v-col>
                          <v-btn color="orange" v-on="on" :disabled="enrolstatus">{{enroltext}}</v-btn>
                        </v-col>
                      </v-row>
                      <v-row v-show="!isLogin">
                        <v-col>
                          <p>*Login to enrol.</p>
                        </v-col>
                      </v-row>
                    </v-col>
                  </template>
                  <v-card class="pa-4" color="rgba(255,255,255,0.90)">
                    <v-card-title style="wordwrap:normal">{{dialog.title}}</v-card-title>
                    <v-card-text>After passing the course, {{point}} points will be gained</v-card-text>
                    <v-card-actions>
                      <div class="flex-grow-1"></div>
                      <v-btn color="grey lighten-1" @click="enrollll()">Yes, I agree</v-btn>
                      <v-btn color="grey lighten-1" @click="dialog.show = false">
                        <span class="darken-2 orange--text">No, thanks</span>
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <!--  -->
              </v-row>
            </v-col>
            <v-col cols="12" md="1" xl="2"></v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      enrolstatus: null,
      course_id: "",
      point: "",
      dialog: {
        show: false,
        title: "Course points",
        text: ""
      },
      enroltext: "Enrol Now"
    };
  },
  methods: {
    async enrollll() {
      this.dialog.show = false;
      try {
        let send = new FormData();
        send.append("username", window.localStorage.getItem("username"));
        send.append("course_id", this.$route.params.id);

        let res = await this.$store.dispatch("callAPI", {
          send: send,
          branch: "/enroll/",
          call: "DO_NOTHING",
          setData: {}
        });
        // console.log(res.code)
        if (res.status == "1") {
          this.$store.commit("SET_SNACKBAR", {
            showing: true,
            text: "Enrolled successfully!",
            color: "success"
          });
          this.$router.push("/user/suggest");
        } else {
          this.$store.commit("SET_SNACKBAR", {
            showing: true,
            text: "You have already enrolled this course",
            color: "error"
          });
          this.$router.push("/suggest");
        }
      } catch {
        this.$store.commit("SET_SNACKBAR", {
          showing: true,
          text: "Error",
          color: "error"
        });
      }
    },

    async checkEnroll() {
      try {
        let send = new FormData();
        send.append("username", window.localStorage.getItem("username"));
        send.append("course_id", this.$route.params.id);
        let res = await this.$store.dispatch("callAPI", {
          send: send,
          branch: "/course_enrollment_check/",
          call: "DO_NOTHING",
          setData: {}
        });
        if (this.isLogin) {
          if (res.code == "1") {
            this.enroltext = "Have enrolled";
            this.enrolstatus = true;
          } else {
            this.enroltext = "Enrol Now";
            this.enrolstatus = false;
          }
        } else {
          this.enrolstatus = true;
        }
      } catch {
        // console.log("Error in check enrollment");
      }
    },
    setup() {
      this.course_id = this.$route.params.id;
      this.point = this.course.course_point;
      // console.log(`P value is ${this.point}`);
      this.checkEnroll();
    }
  },
  computed: {
    course() {
      return this.$store.getters.findCourseById(this.course_id);
    },
    ...mapState(["isLogin"])
  },
  mounted() {
    this.setup();
  }
};
</script>

<style scoped>
li {
  word-wrap: normal;
  text-align: left;
}
#info-card {
  padding: 3em;
  border-radius: 50px;
  border-color: #e3d0ff;
  max-width: 800px;
}
#intro2 {
  color: #5c6ac4;
}
#course-info-container li {
  color: #013567;
}
</style>