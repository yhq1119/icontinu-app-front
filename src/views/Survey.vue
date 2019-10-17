<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="1"></v-col>
      <v-col cols="12" md="10">
        <!--  -->
        <v-card class="pa-4" outlined id="card1">
          <v-row>
            <v-col>
             </v-col>
          </v-row>
            <v-row>
            <v-col>
           </v-col>
          </v-row>  <v-row>
            <v-col>
            </v-col>
          </v-row>
            <v-row>
            <v-col>
            </v-col>
          </v-row>  <v-row>
            <v-col>
            </v-col>
          </v-row>  
          <v-row>
            <v-col style="text-align:left">
              <span class="question">1.{{questions[0].text}}</span>

              <v-textarea color="#5c6ac4" auto-grow  rows="1"></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col style="text-align:left">
              <span class="question">2.{{questions[1].text}}{{course.course_name}}</span>
              <v-textarea color="#5c6ac4" auto-grow  rows="1"></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col style="text-align:left">
              <span class="question">3.{{questions[2].text}}</span>
              <v-textarea color="#5c6ac4" auto-grow  rows="1"></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-none d-md-block">
            </v-col>
            <v-col>
              <v-btn class="indigo--text text--lighten-1" rounded color="#FFCC80" @click="submit_survey">Submit</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col></v-col>
          </v-row>
          <v-row>
            <v-col></v-col>
          </v-row>
        </v-card>
        <!--  -->
      </v-col>
      <v-col cols="12" md="1"></v-col>
    </v-row>
    <v-img class="d-none d-md-block" id="img1" src="../assets/opinion.png"></v-img>
    <v-img class="d-none d-md-block" id="img2" src="../assets/surveytime.png"></v-img>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      course_id:'',
      questions: [
        {
          text: "List three points you have learned."
        },
        {
          text: "Describe your opinions on "
        },
        {
          text:
            "From 1 to 5, how do you rate this seminar? Please briefly state your reasons."
        }
      ]
    };
  },
  methods:{
    showSnackbar(text,color){
      this.$store.commit('SET_SNACKBAR',{
        showing:true,
        text:text,
        color:color
      })
    },
   async submit_survey(){
      let sendData = new FormData()
      sendData.append('username',window.localStorage.getItem('username'))
      sendData.append('course_id',this.course_id)
      let res = await this.$store.dispatch('callAPI',{
        send:sendData,
        branch:'/user_pass_survey/',
        call:'DO_NOTHING',
        setData:{}
      })
      if(res.code == '1'){
        this.$router.push("/submit_sv")
      }
      else{
        this.showSnackbar('Error when submit survey','error')
      }

    }
  },
  computed:{
    course(){
      return this.$store.getters.findCourseById(this.course_id)
    }
  },
  mounted(){
    this.course_id = this.$route.params.id
  }

};
</script>

<style scoped>
#title {
  color: #5c6ac4;
}
#img1 {
  position: absolute;

  left: 0;
  bottom: 0;
}
#img2 {
  position: absolute;
  right: 8em;
  top: 0;
}
#card1 {
  border-radius: 50px;
  border-color: #e3d0ff !important;
  border-width: 1px;
}
.question {
  color: #5c6ac4;
}
</style>