<script setup>
import { useToast } from "vue-toastification";
import { useLiquidateStore } from "~/store/liquidate-bill";
import ModalLiquidateBillInfo from "./ModalLiquidateBillInfo.vue";
import { useServiceStore } from "~/store/services";

const props = defineProps({
  index: {
    type: Number,
    default: 0,
  },
  item: {
    type: Object,
    default: {},
  },
});

const toast = useToast();

const liquidateStore = useLiquidateStore();
const serviceStore = useServiceStore();

const loading = ref(false);
const isShowLiquidateBillInfo = ref(false);
const billId = ref("");
const services = ref([]);

const handleSendLiquidateMail = async () => {
  loading.value = true;
  const res = await liquidateStore.sendingLiquidateBillMail(props.item._id);
  if (res.data) {
    loading.value = false;
    toast.success("Gửi thông báo thành công!");
  }
};

const getServiceInfo = async () => {
  const res = await serviceStore.getAllServices();
  if (res.data) {
    services.value = res.data.services;
  }
};
getServiceInfo();
</script>
<template>
  <tr>
    <td class="tw-text-center">{{ index + 1 }}</td>
    <td>{{ item.roomId?.name }}</td>
    <td>{{ item.memberId?.name }}</td>
    <td>{{ convertDateType(item?.billDate, "DD/MM/YYYY") }}</td>
    <td>{{ formatCurrency(item?.totalBill) }}</td>
    <td>{{ item.isPaid ? "Đã thanh toán" : "Chưa thanh toán" }}</td>
    <td class="tw-flex tw-justify-center tw-items-center tw-gap-x-3">
      <g-button @click="handleSendLiquidateMail" :loading="loading"
        >Thông báo</g-button
      >
      <g-button
        variant="bezeled"
        @click="(isShowLiquidateBillInfo = true), (billId = item._id)"
        >Chi tiết</g-button
      >
    </td>
  </tr>
  <v-dialog v-model="isShowLiquidateBillInfo" width="544">
    <ModalLiquidateBillInfo
      :billId="billId"
      :services="services"
      @close="isShowLiquidateBillInfo = false"
    />
  </v-dialog>
</template>
