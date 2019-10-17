<template>
  <v-row>
    <v-col cols="12" md="2"></v-col>
    <!-- left panel -->
    <v-col cols="12" md="8" justify='center' align='center'>
      <v-row>
        <v-img src="../assets/background.png">
          <div class="getapp">
            <v-btn rounded outlined to="/getapp">
              <v-icon>mdi-cellphone-iphone</v-icon>GET APP
            </v-btn>
          </div>
        </v-img>
      </v-row>
      <v-spacer></v-spacer>
      <v-row justify="center">
        <!-- <h6>Place content here</h6> -->
        <v-card class="statement">
          <v-card-title></v-card-title>
          <v-card-text>
            <v-col justify="center" align="center">
              <h1 class="title1">{{title}}</h1>
              <v-card outlined class="statement-text">
                <v-card-text><h3 class="para1">{{text}}</h3></v-card-text>
              </v-card>
            </v-col>
          </v-card-text>
        </v-card>
      </v-row>
      <v-row class="course-wrapper">
<!--  -->
<v-col cols="12">
  <v-card class="pa-2">
    <v-row>
<!--  -->
 <v-col cols="12" md="6" >
          <v-card dark style="margin-top:15px">
            <v-img width="100%" height="auto" src="../assets/c1.png">
              <h2>Sample Courses</h2>
              <v-card-title class="white--text align-center fill-height"></v-card-title>
            </v-img>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-row>
            <v-col cols="12" md="6">
              <v-card dark>
                <v-img src="../assets/c1.png">
                  <h2>Sample Courses</h2>
                </v-img>
              </v-card>
            </v-col>
            <v-col cols="12" md="6">
              <v-card dark>
                <v-img src="../assets/c1.png">
                  <h2>Sample Courses</h2>
                </v-img>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-card dark>
                <v-img src="../assets/c1.png">
                  <h2>Sample Courses</h2>
                </v-img>
              </v-card>
            </v-col>
            <v-col cols="12" md="6">
              <v-card dark>
                <v-img src="../assets/c1.png">
                  <h2>Sample Courses</h2>
                </v-img>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
<!--  -->
</v-row>
  </v-card>
</v-col>
          
  <!--  -->
      </v-row>
      <v-row justify="center">
        <v-col justify="center" align="center">
          <v-card class="sponsor"><v-col justify="center">
                 <h6>Place content here</h6>
                 Sponsor
     </v-col></v-card>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" md="2"></v-col>
    <!-- right panel -->
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      text:
        "iCONTINU stores, verifies and integrates professional, regulatory and ongoing certification requirements.iCONTINU supports individuals, businesses, educators and regulatory bodies. Please play the short video below to see how it can work for you.",
      title: "Capturing Learning for Life..."
    };
  }
};
</script>

<style scoped>
.getapp {
  position: absolute;
  left: 2%;
  top: 75%;
}
.course-wrapper{
  border-radius: 10px;
  width: 100%;
  padding: 0;
}
.statement {
   border-radius:20px;
  border-width: 2px;
  border-color: blueviolet;
  margin-top: 2em;
  width: 100%;
  min-height: 200px;
  justify-content: center;
}
.statement-text {
  justify-content: center;
  max-width: 900px;
 border-radius:20px;
  border-width: 2px;
  border-color: blueviolet;
}
.sponsor{
  align-content: center;
  align-self: center;
  width: 100%;
  min-height: 20em;
  border-radius:20px;
  border-width: 2px;
  border-color: blueviolet;
}
.title1{
  color:blue;
}
.para1{
  color: blueviolet;
}
</style>