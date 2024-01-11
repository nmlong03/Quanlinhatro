<script setup>
import { useToast } from "vue-toastification";
import { useGuestStore } from "~/store/guest";
import { useNotificationStore } from "~/store/notification";
import CreateNotiForm from "@/components/pages/notification/CreateNotiForm.vue";
import NotiItem from "../../../../components/pages/notification/NotiItem.vue";

definePageMeta({
  layout: "guest",
});

//composable
const route = useRoute();
const toast = useToast();

const getListNotiEventBus = useEventBus(`get-list-noti`);

//store

const guestStore = useGuestStore();
const notificationStore = useNotificationStore();

//state
const notiList = ref([]);

const getNotiListByGuest = async () => {
  const res = await notificationStore.getAllNotification();
  if (res.data) {
    notiList.value = res.data.data;
  }
};

getNotiListByGuest();

getListNotiEventBus.on(() => {
  getNotiListByGuest();
});
</script>
<template>
  <div class="">
    <CreateNotiForm />
    <hr class="tw-my-5" />
    <div class="tw-grid tw-grid-cols-2 tw-gap-4">
      <div v-for="item in notiList">
        <NotiItem :item="item" />
      </div>
    </div>
  </div>
</template>
<style scoped>
@import url("./index.scss");
</style>
