<script setup>
import { useNotificationStore } from "@/store/notification";
import { useToast } from "vue-toastification";

const toast = useToast();
const route = useRoute();

const getListNotiEventBus = useEventBus(`get-list-noti`);

const notificationStore = useNotificationStore();

const title = ref("");
const content = ref("");

const handleCreateNoti = async () => {
  const payload = {
    title: title.value,
    content: content.value,
  };
  const res = await notificationStore.createNotification(payload);
  if (res.data) {
    toast.success("Tạo thông báo thành công!");
    getListNotiEventBus.emit();
  }
};
</script>
<template>
  <div class="tw-w-[50%] tw-flex tw-gap-x-2 tw-items-end">
    <div class="tw-w-[78%]">
      <g-input class="" label="Tiêu đề" required v-model="title"></g-input>
    </div>
    <div>
      <g-button @click="handleCreateNoti">Tạo thông báo</g-button>
    </div>
  </div>
  <div class="tw-gap-y-1 tw-grid tw-pt-4 tw-w-[50%]">
    <p>Nội dung</p>
    <textarea
      v-model="content"
      class="tw-resize-none tw-rounded-[10px] tw-bg-white tw-outline tw-p-3 !tw-outline-[#c0c0c0] tw-outline-[1px] focus:!tw-outline-[#f88125] tw-w-full tw-h-[158px] focus:!tw-shadow-[0px_0px_0px_2px_rgba(248,129,37,0.2)]"
    ></textarea>
  </div>
</template>
