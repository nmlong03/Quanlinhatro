<script setup>
import AllBillTable from "@/components/pages/hoa-don/home/AllBillTable.vue";
import CreateBillTable from "@/components/pages/hoa-don/home/CreateBillTable.vue";

const getBillEventBus = useEventBus(`get-bill-event-bus`);

const billFactorList = ref([
  {
    _id: "1",
    title: "Tạo hóa đơn",
    value: "CREATE_BILL",
  },
  {
    _id: "2",
    title: "Danh sách hóa đơn",
    value: "LIST_BILL",
  },
]);
const listComponent = {
  CREATE_BILL: CreateBillTable,
  LIST_BILL: AllBillTable,
};

const tab = ref("");

watch(
  () => tab.value,
  () => {
    getBillEventBus.emit();
  }
);
</script>
<template>
  <v-card class="conduct-table">
    <v-tabs v-model="tab" class="s-tabs" id="">
      <v-tab v-for="item in billFactorList" :value="item._id">
        <span class="tw-flex tw-items-center">{{ item.title }}</span>
      </v-tab>
    </v-tabs>
    <hr />
    <v-card-text class="conduct-v-card-text">
      <v-window v-model="tab">
        <v-window-item v-for="item in billFactorList" :value="item._id">
          <component :is="listComponent[item.value]"> </component>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>
