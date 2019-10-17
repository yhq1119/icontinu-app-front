<template>
  <v-container>
    <v-tabs v-model="model" centered slider-color="orange" background-color="transparent">
      <v-tab key="1">Profile</v-tab>
      <v-tab key="2">Payment</v-tab>
    </v-tabs>
    <v-tabs-items v-model="model">
      <v-tab-item>
        <Profile />
        </v-tab-item>
      <v-tab-item>
        <Payment />
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script scoped>
import Profile from "../components/Profile";
import Payment from "../components/Payment";
export default {
  components: {
    Profile,
    Payment
  },
  data() {
    return {
      model: 0,
    };
  }
};
</script>

<style>
</style>