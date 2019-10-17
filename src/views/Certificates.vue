<template>
  <v-container>
    <v-row>
      <v-col cols="1" md="2"></v-col>
      <v-col cols="10" md="8">
        <!--  -->
        <v-row>
          <v-col>
            <v-container>
              <v-row class="title">
                <v-col cols="12" md="6">
                  <h1>{{title}}</h1>
                </v-col>
                <v-col cols="12" md="6">
                  <v-img
                    class="d-none d-md-block"
                    width="100px"
                    height="auto"
                    src="../assets/award.png"
                  ></v-img>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-container class="pa-5">
                <v-simple-table fixed-header height="300px">
                  <template v-slot:default>
                    <tbody>
                      <tr v-for="item in certificates" :key="item.index">
                        <td>{{item.status}}</td>
                        <td>{{item.date}}</td>
                        <td>{{item.title}}</td>
                        <td>{{item.notes}}</td>
                        <td>{{item.link}}</td>
                        <td>
                          <v-checkbox success readonly v-model="item.pass"></v-checkbox>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-container>
            </v-container>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-row>
              <v-col>
                <v-row>
                  <v-col align="right">
                    <v-btn id="btn1" outlined rounded @click="send()">Send the certificates via Email</v-btn>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col align="right">
                    <v-btn id="btn2" outlined rounded to="/user/report">Back</v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <!--  -->
      </v-col>
      <v-col cols="1" md="2"></v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      title: "All my Certificates",
      certificates: [
        {
          status: "Pass",
          date: new Date(),
          title: "Advance Science",
          notes: "Send the Certificate Via Email",
          link: "Download",
          pass: true
        },
        {
          status: "Pass",
          date: new Date(),
          title: "Programming",
          notes: "Send the Certificate Via Email",
          link: "Download",
          pass: true
        },
        {
          status: "Pass",
          date: new Date(),
          title: "Data Base",
          notes: "Send the Certificate Via Email",
          link: "Download",
          pass: false
        }
      ]
    };
  },
  methods:{
    send(){
      this.$store.commit('SET_SNACKBAR',{
        showing:true,
        text:'Certificates sent',
        color:'success'
      })
    }
  }
};
</script>

<style scoped>
.title {
  align-items: center;
  justify-content: center;
}
#btn1 {
  width: 300px;
  color: #5c6ac4;
  background-color: #FAEBFD;
}
#btn2{
  width: 300px;
  color: #5c6ac4;
  background-color: #ffbf7f;
}
</style>