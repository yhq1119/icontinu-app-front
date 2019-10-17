<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="1"></v-col>
      <v-col cols="12" md="10">
        <v-card outlined id="history-card">
          <v-sheet>
            <v-card outlined id="his-content">
              <v-card-title>My History</v-card-title>
              <v-container>
                <v-data-table
                  :headers="headers"
                  :items="attendance"
                  :sort-by="['course_time']"
                  :sort-desc="[false, true]"
                  multi-sort
                  class="elevation-1"
                >
                  <template v-slot:item.allpass="{ item }">
                    <v-icon :color="getColor(item)[0]">{{getColor(item)[1]}}</v-icon>
                  </template>
                </v-data-table>
              </v-container>
            </v-card>
          </v-sheet>
        </v-card>
      </v-col>
      <v-col cols="12" md="1"></v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      attendance: [],
      headers: [
        {
          text: "Course name",
          align: "left",
          sortable: false,
          value: "course_name"
        },
        { text: "Date", align: "left", value: "course_time" },
        { text: "QR Pass", align: "left", value: "qr_pass" },
        { text: "Face Pass", align: "left", value: "face_pass" },
        { text: "Survey Pass", align: "left", value: "survey_pass" },
        { text: "All Three Pass", align: "left", value: "allpass" }
      ]
    };
  },
  methods: {
    getColor(attend) {
      var array = ["", ""];
      var atleast =
        attend.qr_pass == "True" ||
        attend.face_pass == "True" ||
        attend.survey_pass == "True";
      var all =
        attend.qr_pass == "True" &&
        attend.face_pass == "True" &&
        attend.survey_pass == "True";
      if (all) {
        array[0] = "green";
        array[1] = "mdi-check-circle";
      }
      if (atleast && !all) {
        array[0] = "yellow";

        array[1] = "mdi-clock";
      }
      if (!atleast) {
        array[0] = "red";
        array[1] = "mdi-information";
      }
      return array;
    },
    async setAttendance() {
      let send = new FormData();
      send.append("username", window.localStorage.getItem("username"));
      let branch = "/attendance/";
      let call = "DO_NOTHING";
      let setData = {};

      let sendData = {
        send: send,
        branch: branch,
        call: call,
        setData: setData
      };

      let res = await this.$store.dispatch("callAPI", sendData);
      this.attendance = res.attendances;
    }
  },

  computed: {
  },
  mounted() {
    this.setAttendance();
  }
};
</script>

<style scoped>
#his-content {
  border-color: transparent;
}
#history-card {
  border-color: #e3d0ff;
  border-radius: 50px;
  padding: 1em;
}
</style>