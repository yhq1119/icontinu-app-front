<template>
  <v-row>
    <v-col cols="1" md="2"></v-col>
    <v-col cols="10" md="8">
      <v-row>
        <v-col>
          <v-row justify="center">
            <h1 align-v="bottom">Certificate</h1>
            <v-img max-height="100px" max-width="120px" class="d-none d-md-block" src="../assets/award.png"></v-img>
          </v-row>
          <v-row>
            <v-card id="upper" outlined width="100%">
              <v-card-title>Skill Status</v-card-title>
              <v-simple-table fixed-header height="300px">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <td>
                      <v-icon large>mdi-clock-outline</v-icon>
                      </td>
                      <td>{{ skill.status }}</td>
                      <td>{{ skill.title }}</td>
                      <td>{{ skill.time }}</td>
                    </tr>
                  </thead>
                  <tbody>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>Result should be available by 01/11/2019, 11:26 AM</td>
                  </tbody>
                </template>
              </v-simple-table>
              </v-card>
               <v-row>
                <v-col align="right" class="pa-5">
                  <v-btn to="/user/certificate" rounded outlined id='view-btn'>View all My Certificates</v-btn>
                </v-col>
              </v-row>
           
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-card style="width:100%" outlined id="lower">
          <v-card-title>Certificate Update</v-card-title>
          <v-simple-table fixed-header>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    <h4>HISTORY</h4>
                  </th>
                  <th class="text-left">
                    <h4>TIME</h4>
                  </th>
                  <th class="text-left">
                    <h4>SUBJECT</h4>
                  </th>
                  <th class="text-left">
                    <h4>NOTES</h4>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in demos" :key="item.index">
                  <td>{{ item.history }}</td>
                  <td>{{ item.time }}</td>
                  <td>{{ item.subject }}</td>
                  <td>{{ item.notes }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-row>
      <v-row></v-row>
    </v-col>
    <v-col cols="1" md="2"></v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      skill: {
        status: "Still In Progress",
        title: "Medical Proficiency",
        time: "SUBMISSION DUE 02/09/2019 12:00 AM"
      },
      demos: [
        {
          history: "In review",
          time: "2019/01/12, 11:26AM",
          subject: "In-Practice Mentoring",
          notes: "Results should be available by 01/11/2019, 11:26AM"
        },
        {
          history: "Fail",
          time: "01/12/2018, 11:26AM",
          subject: "Ethics",
          notes:
            "Your skill did not pass our certification process. We have included a description of the issues in an email sent to the email address associated with this account. Once you have resolved the issues, you will be able to resubmit your skill for certificateee review at any time"
        },
        {
          history: "Pass",
          time: "01/12/2018, 11:26AM",
          subject: "Advanced Science",
          notes: "Send the certificate Via Email        Download"
        },

        {
          history: "Pass",
          time: "01/12/2018, 11:26AM",
          subject: "Programming",
          notes: "Send the certificate Via Email        Download"
        },
        {
          history: "Pass",
          time: "01/12/2018, 11:26AM",
          subject: "Data Base",
          notes: "Send the certificate Via Email        Download"
        }
      ]
    };
  }
};
</script>

<style scoped>
td {
  padding: 1em;
  text-align: start;
  overflow: hidden;
}
#upper {
  padding: 1em;
  border-radius: 10px;
  border-width: 2px;
  border-color: #e3d0ff;
  border-radius: 50px;
}
#lower {
  padding: 1em;
  border-radius: 10px;
  border-width: 2px;
  border-color: #e3d0ff;
  border-radius: 50px;
}
#view-btn{
   color: #DA9A4D;
  background-color: #FAEBFD;
}
</style>