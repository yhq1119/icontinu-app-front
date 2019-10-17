<template>
  <v-container>
    <v-row>
      <v-col>
        <v-row>
          <v-col cols="12" md="1" class="d-none d-md-block"></v-col>
          <v-col cols="12" md="2" class="d-none d-md-block">
            <!-- <v-btn>top</v-btn> -->
            <v-col>
              <v-row align="center">
                <v-col style="text-align:left">
                  <span id="h-title">{{title}}</span>
                </v-col>
              </v-row>
              <v-row>
                <v-col style="text-align:left">
                  <span id="h-text">{{text}}</span>
                </v-col>
              </v-row>
            </v-col>
          </v-col>
          <v-col cols="12" md="8" id="banner-1">
            <!-- <v-btn>right</v-btn> -->
            <v-img src="../assets/background.png"></v-img>
          </v-col>
          <v-col cols="12" md="1" class="d-none d-md-block"></v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="1" class="d-none d-md-block"></v-col>
          <v-col cols="12" md="2" class="d-none d-md-block">
            <!-- <v-btn>left</v-btn> -->
            <v-col class="d-none d-md-block">
              <v-row>
                <v-col cols="6" style="text-align:left;padding:0;" align="center">
                  <span id="filter-title">Filter</span>
                </v-col>
                <v-col cols="6">
                  <v-btn text small rounded class="red--text" @click="clearResult()">Clear Filter</v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-row v-for="item in filters" :key="item.index">
                    <v-col cols="9" md="9" align-self="center" style="text-align:left;padding:0">
                      <span id="filter-item-text">{{item.text}}</span>
                    </v-col>
                    <v-col cols="3" md="3" align-self="center" style="text-align:right;padding:0">
                      <v-checkbox v-model="item.selected" @change="search()"></v-checkbox>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
          </v-col>
          <v-col cols="12" md="8">
            <!-- <v-btn>right</v-btn> -->
            <v-col>
              <v-row>
                <v-col cols="12" md="9">
                  <v-text-field
                    solo-inverted
                    flat
                    rounded
                    hide-details
                    label="Search for the courses you want to learn"
                    prepend-inner-icon="mdi-magnify"
                    v-model="searchInput"
                    @input="searchByWord"
                  ></v-text-field>
                </v-col>
                <!-- <v-col cols="12" md="2"></v-col> -->
                <v-col cols="12" md="3">
                  <v-btn color="#8238E4" rounded text to="/getapp">
                    <v-icon>mdi-cellphone-iphone</v-icon>GET the APP
                  </v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-row>
                    <v-col>
                      <v-card outlined id="course-container" color="#EEFAFC">
                        <v-card-title>
                          <span id="courses-title">Available Courses...</span>
                        </v-card-title>
                        <v-row v-show="this.searchResults.length<1">
                          <v-col>
                            <h1>
                              <span id="no-items">No items</span>
                            </h1>
                          </v-col>
                        </v-row>
                        <v-layout row wrap>
                          <v-flex xs12 md4 lg3 xl3 v-for="item in searchResults" :key="item.index">
                            <v-card
                              outlined
                              style=" margin:10px;height:240px;padding:0"
                              :to="{name:'course detail',params:{id: item.course_id}}"
                            >
                              <v-img v-bind:src="item.src" height="120px"></v-img>
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
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-card outlined id="bottom-container">
                        <v-row>
                          <v-col class="d-none d-md-block"></v-col>
                          <v-col>
                            <v-row>
                              <v-col>
                                <span class="slogon">{{slogon}}</span>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col
                                class="d-none d-md-block"
                                md="3"
                                xl="3"
                                lg="3"
                                sm="12"
                                cols="12"
                                v-for="item in samples"
                                :key="item.index"
                                style="padding:5px;"
                              >
                                <v-card>
                                  <v-img :src="item.src" width="100%"></v-img>
                                </v-card>
                              </v-col>
                            </v-row>
                          </v-col>
                          <v-col class="d-none d-md-block"></v-col>
                        </v-row>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
          </v-col>
          <v-col cols="12" md="1" class="d-none d-md-block"></v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      searchInput: "",
      tags: [{}],
      slogon: "Stay Sharp. Get ahead with learning Paths.",
      text:
        "iCONTINU stores, verifies and integrates professional, regulatory and ongoing certification requirements.",
      title: "Capturing Learning for Life...",
      filters: [
        { text: "Network", model: "", selected: false },
        { text: "Business", model: "", selected: false },
        { text: "Developer", model: "", selected: false },
        { text: "Design", model: "", selected: false },
        { text: "Web", model: "", selected: false },
        { text: "Photography", model: "", selected: false },
        { text: "Marketing", model: "", selected: false },
        { text: "Data", model: "", selected: false }
      ],
      searchResults: [],
      samples: [
        {
          src: require("../assets/b-1.png")
        },
        {
          src: require("../assets/b-2.png")
        },
        {
          src: require("../assets/b-3.png")
        },
        {
          src: require("../assets/b-4.png")
        },
        {
          src: require("../assets/b-5.png")
        },
        {
          src: require("../assets/b-6.png")
        },
        {
          src: require("../assets/b-7.png")
        },
        {
          src: require("../assets/b-8.png")
        }
      ]
    };
  },
  methods: {
    clearResult() {
      for (let j = 0; j < this.filters.length; j++) {
        this.filters[j].selected = false;
      }
      this.filterWords = [];
      this.searchResults = [];
      this.setCourses();
    },
    async searchByWord() {
      var founds = [];
      for (let i = 0; i < this.courses.length; i++) {
        var name = this.courses[i].course_name.toUpperCase();
        var time = this.courses[i].course_time.toUpperCase();
        var point = this.courses[i].course_point.toUpperCase();
        var location = this.courses[i].course_location.toUpperCase();
        var duration = this.courses[i].course_duration.toUpperCase();
        var desc = this.courses[i].course_desc.toUpperCase();

        var word = this.searchInput.toUpperCase();

        if (
          name.includes(word) ||
          time.includes(word) ||
          point.includes(word) ||
          location.includes(word) ||
          duration.includes(word) ||
          desc.includes(word)
        ) {
          founds.push(this.courses[i]);
        }
      }
      if (this.searchInput.length > 0) {
        this.searchResults = founds;
      } else {
        this.searchResults = this.courses;
      }
    },
    search() {
      var founds = [];
      var count = 0;
      for (let i = 0; i < this.courses.length; i++) {
        for (let j = 0; j < this.filters.length; j++) {
          if (this.filters[j].selected) {
            count = count + 1;
            if (this.courses[i].course_name.includes(this.filters[j].text)) {
              founds.push(this.courses[i]);
            } else if (
              this.courses[i].course_desc.includes(this.filters[j].text)
            ) {
              founds.push(this.courses[i]);
            }
          }
        }
      }
      console.log(this.courses);
      if (count > 0) {
        this.searchResults = founds;
      } else {
        this.searchResults = this.courses;
      }
      console.log("this courses");
      console.log(this.courses);
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
      return sss;
    },
    async setCourse() {
      await this.$store.dispatch("set_courses");
      this.searchResults = this.courses;    
    }
  },
  computed: {
    ...mapState(["courses"])
  },
  mounted() {
    this.setCourse()
    console.log(this.courses.length);
    console.log(this.searchResults.length);
  }
};
</script>

<style scoped>
#banner-1 {
  margin: auto !important;
}
#no-items {
  color: #5c6ac4;
}
#courses-title {
  color: #5c6ac4;
  font-weight: 600;
}
#filter-title {
  color: #5c6ac4;
  font-size: 26px;
  font-weight: 600;
}
.slogon {
  font-size: 20px;
  font-weight: bolder;
}
v-btn {
  width: 100%;
}
#h-title {
  color: black;
  font-size: 20px;
  font-weight: bold;
}
#h-text {
  color: black;
  font-size: 14px;
}
#filter-item-text {
  color: #5c6ac4;
}
#course-container {
  margin: 10px;
  padding: 15px;
  color: aqua；;
}
#bottom-container {
  margin: 10px;
  padding: 30px;
  border-color: #e3d0ff;
  border-radius: 20px;
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
</style>