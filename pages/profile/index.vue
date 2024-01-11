<script setup>
import CardUser from "@/components/pages/user-info/index.vue";
import Header from "@/components/global/header/Header.vue";
import Footer from "@/components/global/footer/Footer.vue";
import { useUserStore } from "~/store/user";

// compatibility
const fetchDataUserEventBus = useEventBus(`fetch-data-user`);

// state

// store
const userStore = useUserStore();
const userData = ref(null);
const getUser = async () => {
  try {
    const res = await userStore.getOneUser();
    if (res.data) {
      userData.value = res.data.message;
    }
  } catch (error) {
    throw error;
  }
};

getUser();

fetchDataUserEventBus.on(() => {
  userData._value = null;
  getUser();
});
</script>
<template>
  <Header />
  <CardUser v-if="userData !== null" :data="userData" />
  <Footer />
</template>
