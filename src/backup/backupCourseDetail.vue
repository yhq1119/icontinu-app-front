<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex></v-flex>
      <v-flex xs12 md4 class="pa-2">
        <v-layout column>
          <v-flex>
            <h1>COURSE INTRODUCTION</h1>
          </v-flex>
          <v-flex>
            <v-card class="pa-4">
              <v-layout column>
                <v-flex>
                  <h2>Introduction</h2>
                </v-flex>
                <v-flex>
                  <strong>
                    <v-divider></v-divider>
                  </strong>
                </v-flex>
                <v-flex>
                  <v-layout row>
                    <v-flex>
                      <ul>
                        <li>What is {{course.course_name}}</li>
                        <li>What are {{course.course_name}} principles</li>
                        <li>{{course.course_name}} business behaviour</li>
                        <li>Breif history of {{course.course_name}}</li>
                      </ul>
                    </v-flex>
                    <v-flex>
                      <ul>
                        <li>{{course.course_name}} in research</li>
                        <li>Name: {{course.course_name}}</li>
                        <li>Time: {{course.course_time}}</li>
                        <li>Point(s): {{course.course_point}}</li>
                        <li>Duration: {{course.course_duration}} hour(s)</li>
                        <li>Location: {{course.course_location}}</li>
                        <li>Description of {{course.course_name}}: {{course.course_desc}}</li>
                      </ul>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 md4 class="pa-2" justify-space-between>
        <v-layout column justify-space-between>
          <v-flex class="d-none d-md-block">
            <v-img max-height="300px" max-width="300px" src="../assets/eroll-logo.png"></v-img>
          </v-flex>
          <v-flex></v-flex>
          <v-flex>
            <v-spacer></v-spacer>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex>
            <v-dialog v-model="dialog.show" persistent max-width="340px" min-height="500px">
              <template v-slot:activator="{ on }">
                <v-btn color="orange" dark v-on="on" :disabled="!isLogin">{{enroltext}}</v-btn>
              </template>
              <v-card class="pa-4" color="rgba(255,255,255,0.75)">
                <v-card-title style="wordwrap:normal">{{dialog.title}}</v-card-title>
                <v-card-text>To enrol this course, {{p}} points will be deducted</v-card-text>
                <v-card-actions>
                  <div class="flex-grow-1"></div>
                  <v-btn color="grey lighten-1" @click="enrollll()">Yes, I agree</v-btn>
                  <v-btn color="grey lighten-1" @click="dialog.show = false">
                    <span class="darken-2 orange--text">No, thanks</span>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex></v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      courses: [],
      p: "",
      dialog: {
        show: false,
        title: "Please pay for the course with your points",
        text: ""
      },
      enroltext: "Enrol"
    };
  },
  methods: {
    async setCourses() {
      try {
        let send = new FormData();
        let branch = "/get_all_courses/";
        let call = "DO_NOTHING";
        let sendData = {
          send: send,
          branch: branch,
          call: call,
          setData: {}
        };

        let res = await this.$store.dispatch("callAPI", sendData);
        this.courses = res.courses;

        this.$store.commit("SET_SNACKBAR", {
          showing: true,
          text: "Courses Loaded!",
          color: "success"
        });
      } catch {
        this.$store.commit("SET_SNACKBAR", {
          showing: true,
          text: "Error when loading courses!",
          color: "error"
        });
      }
    },
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
        } else {
          this.$store.commit("SET_SNACKBAR", {
            showing: true,
            text: res.message,
            color: "error"
          });
        }
      } catch {
        this.$store.commit("SET_SNACKBAR", {
          showing: true,
          text: "Error",
          color: "error"
        });
      }
    },
    setP(p) {
      this.p = p;
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
        if (res.code == "1") {
          this.enrol = "Have enrolled";
        }
      } catch {
          console.log('Error in check enrollment')
      }
    }
  },
  computed: {
    course() {
      console.log("Course finding");
      return this.courses.find(c => c.course_id == this.$route.params.id) || {};
    },
    point() {
      var c =
        this.courses.find(c => c.course_id == this.$route.params.id) || {};
      return c.course_point;
    },

    ...mapState(["isLogin"])
  },
  mounted() {
    this.setCourses();
    var c = this.courses.find(c => c.course_id == this.$route.params.id) || {};
    console.log("Mounting course detail");
    console.log(c);
    var p = c.course_point;
    this.setP(p);
    this.checkEnroll()

    this.dialog.text = `To enrol this course, ${p} points will be deducted`;
  }
};
</script>

<style scoped>
li {
  word-wrap: normal;
  text-align: left;
}
</style>