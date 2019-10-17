<template>
  <v-col>
    <v-container>
      <v-row justify="center">
        <!--  -->
        <v-col cols="12" md="1"></v-col>
        <v-col col="12" md="10">
          <v-img src="../assets/background.png"></v-img>
        </v-col>
        <v-col></v-col>
      </v-row>
      <v-row>
        <!--  -->
        <v-layout wrap="true">
          <v-flex xs12 sm12 mb1 lg1 xl1></v-flex>

          <v-flex xs12 sm12 mb6 lg6>
            <!--  -->
            <v-container>
              <h1>My Courses</h1>
              <v-row justify="center">
                <h3 v-if="courses.length<1">Not enrolled any course yet</h3>
              </v-row>
              <v-row>
                <v-col
                  v-for="item in courses"
                  :key="item.course_id"
                  cols="12"
                  md="6"
                  style="padding:0.25em"
                >
                  <v-card
                    height="120px"
                    class="course-container"
                    @click="goView(item.course_id)"
                  >
                    <v-row>
                      <v-col
                        class="date-part"
                        style="padding:0; margin-left:10px;"
                        cols="3"
                        align="right"
                      >
                        <div>
                          <br />
                          <h3>{{date1(item.course_time)[2]}}</h3>
                          <h2>{{date1(item.course_time)[1]}}</h2>
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
                          <span class="course-time">{{date2(item.course_time)}}</span>
                        </v-row>

                        <v-row style="margin-top:10px;">
                          <v-chip small color="orange">{{item.course_point}} Points</v-chip>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
            <!--  -->
          </v-flex>
          <v-flex xs12 sm12 mb4 lg4>
            <v-col no-gutters>
              <v-row>
                <v-col>
                  <template v-slot:activator>
                    <v-list-item-title>Users</v-list-item-title>
                  </template>

                  <v-list-group no-action sub-group value="true">
                    <v-list-item v-show="surveys.length==0">
                      <v-list-item-content>
                        <p id="pending">No pending surveys</p>
                      </v-list-item-content>
                    </v-list-item>
                    <template v-slot:activator>
                      <v-list-item-content>
                        <v-list-item-title>
                          <h4>Pending Surveys</h4>
                        </v-list-item-title>
                      </v-list-item-content>
                    </template>

                    <v-list-item
                      v-for="(survey, i) in surveys"
                      :key="i"
                      link
                      :to="{name:'survey',params:{id: survey.course_id}}"
                    >
                      <v-col align="left">
                        <v-row>
                          <v-list-item-title>
                            <h6 id="survey-c-name">Course Name: {{survey.course_name}}</h6>
                          </v-list-item-title>
                        </v-row>
                        <v-row>
                          <v-list-item-title v-text="survey.status"></v-list-item-title>
                        </v-row>
                        <v-row>
                          <v-list-item-title>{{survey.course_time}}</v-list-item-title>
                        </v-row>
                      </v-col>
                      <v-divider></v-divider>
                    </v-list-item>
                  </v-list-group>
                </v-col>
              </v-row>
              <v-row>
                <v-col></v-col>
              </v-row>
            </v-col>
          </v-flex>
          <v-flex xs12 sm12 mb2 lg1 xl1></v-flex>
        </v-layout>
        <!--  -->
      </v-row>
    </v-container>
  </v-col>
</template>

<script>
export default {
  data() {
    return {
      surveys: [],

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
    goView(id){
      this.$router.push({name:'my course view',params:{id: id}})
    },
    // goRec(id) {
    //   this.$router.push({ path: "/user/course", query: { course: id } });
    // },
    date2(str) {
      var temp = str.split(" ");
      var date = new Date(temp[0]);
      var ss = date.toString();
      var sss = ss.split(" ");

      return sss[1] + " " + sss[2] + " " + sss[3];
    },
    date1(str) {
      var temp = str.split(" ");
      var date = new Date(temp[0]);
      // console.log(date);
      var ss = date.toString();
      // console.log(ss);
      var sss = ss.split(" ");
      // console.log(sss[1]);
      // return sss[1] + " " + sss[2];
      return sss;
    },
    async setSurveys() {
      let res = await this.$store.dispatch("callAPI", {
        send: {},
        branch: "/attendance/",
        call: "",
        setData: {}
      });

      var s = res.attendances;
      for (var i = 0; i < s.length; i++) {
        if (s[i].survey_pass != "True") {
          s[i].status = "-INCOMPLETE";
          this.surveys.push(s[i]);
        }
      }
    },

    async setCourses() {
      let send = new FormData();
      send.append("username", window.localStorage.getItem("username"));
      let branch = "/get_user_all_enrollment/";
      let call = "DO_NOTHING";
      let sendData = {
        send: send,
        branch: branch,
        call: call,
        setData: {}
      };

      let res = await this.$store.dispatch("callAPI", sendData);
      this.courses = res.courses;
      for (var i = 0; i < this.courses.length; i++) {
        this.courses[i].src = this.pics[i % 5].src;
      }
    }
  },
  computed: {},
  mounted() {
    this.setCourses();
    this.setSurveys();
  }
};
</script>

<style scoped>
#survey-c-name {
  overflow: hidden;
  max-width: 200px;
}
h2 {
  text-transform: uppercase;
}
#pending {
  color: #5c6ac4;
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
.course-container {
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
</style>