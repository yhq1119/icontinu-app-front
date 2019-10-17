<template>
  <v-container justify-self="center">
    <v-row justify="center">
      <v-col cols="12" md="1"></v-col>
      <v-col cols="12" md="3"></v-col>
      <v-col cols="12" md="5">
        <v-row>
          <v-col></v-col>
        </v-row>
        <v-row>
          <v-col></v-col>
        </v-row>
        <v-row>
          <v-col></v-col>
        </v-row>
        <v-row>
          <v-col></v-col>
        </v-row>
        <v-row>
          <v-col></v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card outlined id="card2">
              <v-row>
                <v-col id="text-container1">
                  <v-row>
                    <v-col>
                      <span id="text1">
                        Survey has been submitted.
                        <br />Thank you!
                      </span>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn class="indigo--text text--lighten-1" rounded color="#FFCC80" to="/">CLOSE</v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="2"></v-col>
      <v-col cols="12" md="1"></v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style scoped>
#text-container1 {
  text-align: left;

  justify-content: center;
  text-justify: auto;
  vertical-align: center !important;
}
#text1 {
  vertical-align: center !important;
  font-size: 28px;
  color: #5c6ac4;
}
#card2 {
  border-radius: 50px;
  border-color: #e3d0ff;
  padding: 50px 50px 100px 50px;
}
</style>