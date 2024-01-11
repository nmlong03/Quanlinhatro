<script setup>
import MailsTable from "@/components/pages/lich-su/MailsTable.vue";
import { useMailsStore } from "~/store/mails";
import CreateMailsForm from "~/components/pages/lich-su/CreateMailsForm.vue";

// compatibility
// store
const mailsStore = useMailsStore();
// state
const dataMails = ref(null);
const isDisplayCreateMails = ref(false);
const fetchListMailsEventBus = useEventBus(`fetch-list-mails`);
// function
const getAllMails = async (params) => {
  const res = await mailsStore.getAllMails(
    `page=1&limit=10000000000&sortBy=createdAt&sortOrder=desc`
  );
  if (res.data !== null) {
    dataMails.value = null;
    dataMails.value = res.data.mails;
  }
  if (res.error !== null) {
    console.log(res.error);
  }
};
getAllMails(0);

fetchListMailsEventBus.on(() => {
  dataMails.value = null;
  getAllMails(0);
});
</script>
<template>
  <header class="tw-grid tw-grid-cols-4 tw-items-end tw-gap-x-3 tw-py-3">
    <g-button
      class="!tw-h-[38px] !tw-w-40"
      @click="isDisplayCreateMails = true"
    >
      Gửi mail
    </g-button>
  </header>
  <section>
    <MailsTable v-if="dataMails !== null" :data="dataMails" />
  </section>
  <v-dialog v-model="isDisplayCreateMails" width="544">
    <CreateMailsForm @close="isDisplayCreateMails = false" />
  </v-dialog>
</template>
