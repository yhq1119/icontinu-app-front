<template>
  <div>
        <template>
            <v-simple-table fixed-header height="300px">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Name</th>
                    <th class="text-left">Time</th>
                    <th class="text-left">QR Pass</th>
                    <th class="text-left">Face Pass</th>
                    <th class="text-left">Survey Pass</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in attendance" :key="item.name">
                    <td>{{ item.course_name }}</td>
                    <td>{{ item.course_time }}</td>
                    <td>{{ item.qr_pass}}</td>
                    <td>{{ item.face_pass}}</td>
                    <td>{{ item.survey_pass }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </template>
        
  </div>
</template>

<script>
export default {
  data(){
    return{
      item:[

      ]
    }
  }

}
</script>

<style>

</style>