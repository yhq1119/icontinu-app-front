<template>
  <v-container>
    <v-layout row wrap>
      <v-flex md12 sm12 xs12 lg12 xl12>
        <!-- <v-btn class="full">head</v-btn> -->
        <!-- <v-flex></v-flex> -->
        <v-layout row>
          <v-flex xs12 md1></v-flex>
          <v-flex xs12 md3>
            <v-layout column>
              <v-flex>{{title}}</v-flex>
              <v-flex>{{text}}</v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12 md7>
            <v-img src="../assets/background.png"></v-img>
          </v-flex>
          <v-flex xs12 sm12 md1></v-flex>
        </v-layout>
      </v-flex>
      <v-flex md4 xs12>
        <!-- <v-btn class="full">left</v-btn> -->
        <v-layout row>
          <v-flex xs10 md2></v-flex>
          <v-flex xs10 md8>
            <v-layout column>
              <v-flex class="filter">
                <v-layout row>
                  <v-flex>
                  <span class="filter-title">Filter</span>

                  </v-flex>
                  <v-flex>
                  <v-btn text class="red--text">Clear Filter</v-btn>

                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex>
                <v-layout column v-for="item in filters" :key="item.index">
                  <v-flex>
                    <v-layout row class="filter-items">
                      <v-flex xs6 class="d-flex align-center">
                        <span>{{item.text}}</span>
                      </v-flex>
                      <v-flex>
                        <span>
                          <v-checkbox label :v-model="item.model"></v-checkbox>
                        </span>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
      <!-- <v-layout row wrap></v-layout> -->
      <v-flex md8 xs12>
        <!-- <v-btn class="full">right</v-btn> -->
        <v-layout column>
          <v-flex>
            <v-layout row justify-space-between style="padding:20px">
              <v-flex class="d-flex align-center">
                <v-text-field
                  v-if="!responsive"
                  solo-inverted
                  flat
                  rounded
                  hide-details
                  label="Search for the courses you want to learn"
                  prepend-inner-icon="mdi-magnify"
                ></v-text-field>
              </v-flex>

              <v-flex class="d-flex align-center justify-end">
                <v-btn color="#8238E4" rounded text to="/getapp">
                  <v-icon>mdi-cellphone-iphone</v-icon>GET the APP
                </v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex>
            <v-card outlined class="course-container">
              <v-card-title class="purple--text text--lighten-1">Available Courses...</v-card-title>
              <v-layout row wrap>
                <v-flex xs12 md4 lg4 xl3 v-for="item in courses" :key="item.index">
                  <v-card
                    outlined
                    style=" margin:10px;height:240px;"
                    :to="{name:'course detail',params:{id: item.course_id}}"
                  >
                    <v-img :src="item.src" height="120px"></v-img>

                    <v-col>
                      <v-row>
                        <span class="card-c-name">{{item.course_name}}</span>
                      </v-row>

                      <v-row>
                        <span class="card-c-desc">{{item.course_desc}}</span>
                      </v-row>
                    </v-col>
                    <v-card-actions>
                      <span style="font-size:14px;">.3h29m</span>.
                      <span style="font-weight:bold;font-size:14px">{{item.ran}} views</span>
                    </v-card-actions>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
          <v-flex>
            <v-card outlined class="bottom-container">
              <v-layout column>
                <v-flex>
                  <span class="slogon">{{slogon}}</span>
                </v-flex>
                <v-flex>
                  <v-layout row>
                    <v-flex md3></v-flex>
                    <v-flex md6>
                      <v-flex>
                        <!-- <v-card outlined style="padding:10px"> -->
                        <v-layout row wrap>
                          <v-flex md3 xs12 v-for="item in samples" :key="item.index">
                            <v-card style="margin:5px;">
                              <v-img src="../assets/c1.png" height="50%" width="100%"></v-img>
                            </v-card>
                          </v-flex>
                        </v-layout>
                        <!-- </v-card> -->
                      </v-flex>
                    </v-flex>
                    <v-flex md3></v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      
      courses: [],
      slogon: "Stay Sharp. Get ahead with learning Paths.",
      text:
        "iCONTINU stores, verifies and integrates professional, regulatory and ongoing certification requirements.",
      title: "Capturing Learning for Life...",
      filters: [
        { text: "Business", model: "" },
        { text: "Developer", model: "" },
        { text: "Design", model: "" },
        { text: "Web", model: "" },
        { text: "Photography", model: "" },
        { text: "Marketing", model: "" }
      ],
      samples: [{}, {}, {}, {}, {}, {}, {}, {}],
      randomPics: [
        {
          src:
            "https://images.unsplash.com/photo-1569025743873-ea3a9ade89f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjExMDk0fQ&auto=format&fit=crop&w=1050&q=80"
        },
        {
          src:
            "https://images.unsplash.com/photo-1563283323-afa46a75568c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1029&q=80"
        },
        {
          src:
            "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
        },
        {
          src:
            "https://images.unsplash.com/photo-1474377207190-a7d8b3334068?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
        },
        {
          src:
            "https://images.unsplash.com/photo-1558986377-c44f6a2b50f0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
        },
        {
          src:
            "https://images.unsplash.com/photo-1459499362902-55a20553e082?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1049&q=80"
        }
      ]
    };
  },
  methods: {
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
        this.courses[i].src = this.randomPics[i % 5].src;
        this.courses[i].ran = this.randomNum();
        if (this.courses[i].course_desc.length < 1) {
          this.courses[i].course_desc = "No Description";
        }
      }
    },
    randomNum() {
      return parseInt(Math.random() * 100000 * Math.random());
    }
  },
  computed: {},
  mounted() {
    this.setCourses();
  }
};
</script>

<style scoped>
.course-container {
  margin: 10px;
  padding: 10px;
  color: aqua；;
}
.bottom-container {
  margin: 10px;
  padding: 30px;
}
.card-c-name {
  word-wrap: none;
  overflow: hidden;
  padding: 0 0 0 10px;
  max-height: 18px;
  font-size: 14px;
  font-weight: bold;
}
.card-c-desc {
  text-align: left;
  padding: 0 0 0 10px;
  overflow: hidden;
  font-size: 12px;
  height: 36px;
}
v-row {
  text-align: left;
}
.filter-title {
  color: "#5C6AC4" !important;
  font-size: 20px;
  font-weight: bolder;
}
.filter-items {
  padding: 0 15px 0 10px;
}
.filter {
  text-align: left;
  padding: 10px;
  margin-top: 10px;
  justify-items: space-between;
}
.full {
  width: 100%;
  height: 500 px;
}
.s-title {
  font-size: 30px;
  font-weight: bold;
  word-wrap: normal;
  text-align: left;
  padding: 15px;
  /* margin-left: 10px; */
}
.s-text {
  /* margin-left: 10px; */
  font-size: 14px;
  text-align: left;
  word-wrap: normal;

  /* padding: 15px; */
}
.s-card {
  /* padding: 15px; */
  height: 100%;
  width: auto;
}
.slogon {
  font-size: 20px;
  font-weight: bolder;
}
</style>