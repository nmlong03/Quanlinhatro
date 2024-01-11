<script setup>
import { VDataTable } from "vuetify/lib/labs/components.mjs";
import { usePaymentStore } from "@/store/payment";
import PaymentItem from "../PaymentItem.vue";
import ModalCreatePayment from "../ModalCreatePayment.vue";

const route = useRoute();
const fetchListPaymentEventBus = useEventBus(`fetch-list-payment`);

const paymentStore = usePaymentStore();

const headers = [
  {
    title: "STT",
    sortable: false,
    key: "STT",
    width: "73px",
  },
  {
    title: "Phương thức thanh toán",
    sortable: false,
    key: "name",
    width: "400px",
  },
  {
    title: "Kiểu",
    sortable: false,
    key: "type",
  },
  {
    title: "Ghi chú",
    sortable: false,
    key: "description",
  },
  {
    title: "Kích hoạt",
    sortable: false,
    key: "activeService",
  },
];

const paymentMethods = ref([]);
const isShowModalCreatePaymentMethod = ref(false);

const getAllPaymentMethod = async () => {
  const res = await paymentStore.getAllPaymentMethod();
  if (res.data) {
    paymentMethods.value = res.data.paymentMethods;
  }
};

getAllPaymentMethod();

fetchListPaymentEventBus.on(() => {
  getAllPaymentMethod();
});
</script>
<template>
  <g-button class="tw-mb-3" @click="isShowModalCreatePaymentMethod = true">
    Thêm phương thức thanh toán
  </g-button>
  <v-data-table :headers="headers" class="s-table" :items="paymentMethods">
    <template #item="{ item, index }">
      <PaymentItem :item="item" :index="index" />
    </template>
  </v-data-table>
  <v-dialog v-model="isShowModalCreatePaymentMethod" width="544">
    <ModalCreatePayment @close="isShowModalCreatePaymentMethod = false" />
  </v-dialog>
</template>
