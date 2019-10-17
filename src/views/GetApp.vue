<template>
  <v-row>
    <!--  -->
    <v-col md="6" cols="12">
      <v-card class="left-image">
        <v-img src="../assets/app222.png"></v-img>
      </v-card>
    </v-col>
    <v-col md="6" cols="12">
      <v-card class="right-panel">
        <v-col>
          <h1>Get the Icontinu App</h1>
          <h3>Your next great journey is at your fingertips</h3>
          <h3>We'll send you a link, open it on your phone to download the app</h3>
          <v-spacer></v-spacer>
          <v-row class="input-group">
            <v-col class="input-col" cols="2" md="2">
              <v-text-field width="3em" placeholder="+61" outlined dense></v-text-field>
            </v-col>
            <v-col class="input-col" cols="6" md="7">
              <v-text-field outlined dense></v-text-field>
            </v-col>
            <v-col class="input-col" cols="4" md="3">
              <v-btn large outlined dark color='blue'>Text Link</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-divider></v-divider>
            <v-col></v-col>OR
            <v-col></v-col>
            <v-divider></v-divider>
          </v-row>
          <v-row  class="input-group">
            <v-col class="input-col" cols="8" md="9">
              <v-text-field outlined dense></v-text-field>
            </v-col>
            <v-col cols="4" class="input-col" md="3">
              <v-btn large outlined dark color="blue">Email Link</v-btn>
            </v-col>
          </v-row>
          <v-spacer></v-spacer>
          <v-row>
            <v-col cols="6">
              <v-img class="app-icon" src="../assets/apple.png"></v-img>
            </v-col>
            <v-col cols="6">
              <v-img class="app-icon" src="../assets/google.png"></v-img>
            </v-col>
          </v-row>
        </v-col>
      </v-card>
    </v-col>
<!--  -->
  </v-row>
</template>

<script>
export default {};
</script>

<style scoped>
h1 {
  color: blueviolet;
  text-align: left;
}
h3 {
  text-align: left;
  color: cornflowerblue;
}
.app-icon {
  height: 100%;
}
.left-image {
  padding: 2em;
}
.right-panel {
  padding: 2em;
  height: 100%;
}
.input-group {
  align-self: center;
  justify-items: center;
}
.input-col{
    padding: 3px;
}
</style>