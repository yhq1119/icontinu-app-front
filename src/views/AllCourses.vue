<template>
  <v-container class="my-container">
    <!-- <v-col cols="12" md="2"></v-col> -->
    <v-row>
      <v-col cols="12" md="1"></v-col>
      <v-col cols="12" md="10">
        <v-row>
          <v-col>
            <v-img src="../assets/background.png"></v-img>
          </v-col>
        </v-row>
        <v-row justify="center">
          <h1>All Courses</h1>
        </v-row>
        <v-row>
          <!--  -->
          <!--  -->
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
                  v-bind:style='item.bgc'
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
          <!--  -->
          <!--  -->
        </v-row>
      </v-col>
      <v-col cols="12" md="1"></v-col>
      <!-- <v-col cols="12" md="2"></v-col> -->
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
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
      this.$router.push({name:'course detail',params:{id: id}})
    },
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
      var ss = date.toString();
      var sss = ss.split(" ");
      // return sss[1] + " " + sss[2];
      return sss;
    },
    async setCourses() {
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
      for (var i = 0; i < this.courses.length; i++) {
        this.courses[i].src = this.pics[i % 5].src;
      }
    },
    color(str) {
      var temp = str.split(" ");
      var date = new Date(temp[0]);
      var half = new Date("2019-06-30");
      return date.getTime < half.getTime ? "orange" : "gray";
    }
  },
  computed: {},
  mounted() {
    this.setCourses();
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
.my-container {
  border-radius: 15px;
  border-width: 2px;
  border-color: aquamarine;
}
</style>