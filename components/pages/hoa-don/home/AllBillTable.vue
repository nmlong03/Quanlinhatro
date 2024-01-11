<script setup>
import { useBillStore } from "~/store/bill";
import { VDataTable } from "vuetify/lib/labs/components.mjs";
import BillItem from "@/components/pages/hoa-don/BillItem.vue";
import { timeTables } from "~/utils/constants";
import { useServiceStore } from "@/store/services";
import { getCurrentDateString } from "~/utils/helps";

const route = useRoute();

const getBillEventBus = useEventBus(`get-bill-event-bus`);

//store
const billStore = useBillStore();
const serviceStore = useServiceStore();

//state
const bills = ref([]);
const headers = [
  {
    title: "STT",
    sortable: false,
    key: "STT",
    width: "73px",
  },
  {
    title: "Tên phòng",
    sortable: false,
    key: "roomName",
    width: "200px",
  },
  {
    title: "Họ và tên chủ",
    sortable: false,
    key: "fullName",
    width: "200px",
  },
  {
    title: "Tổng hóa đơn",
    sortable: false,
    key: "totalBill",
    width: "200px",
  },
  {
    title: "Đã thanh toán",
    sortable: false,
    key: "paid",
    width: "200px",
  },
  {
    title: "Còn nợ",
    sortable: false,
    key: "remaining",
    width: "200px",
  },
  {
    title: "Trạng thái",
    sortable: false,
    key: "paidStatus",
    sortable: true,
  },
];

const time = ref(getCurrentDateString());
const services = ref([]);

//method
const getAllBills = async (monthDate) => {
  const payload = {
    motel: route.params.motelId,
    monthDate: monthDate,
  };
  const res = await billStore.getAllBill(payload);
  if (res.data) {
    bills.value = res.data.bills;
  }
};

getAllBills(convertDateType(time.value, "MM/YYYY"));

const getServiceInfo = async () => {
  const res = await serviceStore.getAllServices();
  if (res.data) {
    services.value = res.data.services;
  }
};
getServiceInfo();

// getAllBills();

getBillEventBus.on(() => {
  getAllBills(convertDateType(time.value, "MM/YYYY"));
});

watch(
  () => time.value,
  (newVal) => {
    getAllBills(convertDateType(newVal, "MM/YYYY"));
  }
);
</script>
<template>
  <g-date-picker class="tw-w-[200px] tw-mb-10" v-model="time"></g-date-picker>
  <v-data-table :headers="headers" class="s-table" :items="bills">
    <template #item="{ item, index }">
      <BillItem :item="item" :index="index" :services="services" />
    </template>
  </v-data-table>
</template>
