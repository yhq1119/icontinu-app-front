<template>
  <v-container>
    <v-row>
      <!--  -->
      <!-- <v-col cols="12" md="2"></v-col> -->
      <!--  -->
      <v-col cols="12" md="12">
        <router-view></router-view>
      </v-col>
      <!--  -->
      <!-- <v-col cols="12" md="2"></v-col> -->
      <!--  -->
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped>
</style>