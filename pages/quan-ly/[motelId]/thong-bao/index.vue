<script setup>
import { useNotificationStore } from "~/store/notification";
import NotiItemForOwner from "@/components/pages/notification/NotiItemForOwner.vue";
import CreateNotiForm from "@/components/pages/notification/CreateNotiForm.vue";

const getListNotiEventBus = useEventBus(`get-list-noti`);

const notificationStore = useNotificationStore();

const notifications = ref([]);

const getAllNoti = async () => {
  const res = await notificationStore.getAllNotificationForOwner();
  if (res.data) {
    notifications.value = res.data.data;
  }
};

getAllNoti();

getListNotiEventBus.on(() => {
  getAllNoti();
});
</script>
<template>
  <div class="tw-grid tw-grid-cols-2 tw-gap-4">
    <div v-for="item in notifications">
      <NotiItemForOwner :item="item" />
    </div>
  </div>
</template>
