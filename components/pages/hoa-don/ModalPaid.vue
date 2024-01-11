<script setup>
import IconClose from "@/assets/svg/close.svg";
import IconXMark from "@/assets/svg/x-mark.svg";
import { useBillStore } from "~/store/bill";
import { useToast } from "vue-toastification";

//props
const props = defineProps({
  billInfo: {
    type: Object,
    default: {},
  },
});

const emit = defineEmits(['close'])

const getBillEventBus = useEventBus(`get-bill-event-bus`);

//composable
const toast = useToast();
const route = useRoute();

//store
const billStore = useBillStore();
//state
const paid = ref(0);
const isPaidFull = ref(false);
const loading = ref(false);
const paidFullLoading = ref(false);

const handleUpdateBillPaidAmount = async () => {
  loading.value = true;
  const payload = {
    paidAmount: paid.value,
    isPaidFull: false,
  };
  const res = await billStore.updateBillPaidAmount(payload, props.billInfo._id);
  if (res.data) {
    loading.value = false;
    toast.success("Cập nhật hóa đơn thành công!");
    getBillEventBus.emit()
    emit('close')
  }
};

const handlePaidFull = async () => {
  paidFullLoading.value = true;
  const payload = {
    paidAmount: 0,
    isPaidFull: true,
  };
  const res = await billStore.updateBillPaidAmount(payload, props.billInfo._id);
  if (res.data) {
    paidFullLoading.value = false;
    toast.success("Cập nhật hóa đơn thành công!");
    getBillEventBus.emit()
    emit('close')
  }
};
</script>
<template>
  <div class="modal-change-information">
    <div class="">
      <button
        @click="$emit('close')"
        class="modal-change-information__btn-close"
      >
        <IconClose />
      </button>
      <h5
        class="tw-text-center tw-text-xl tw-leading-6 tw-font-extrabold tw-mb-3 tw-mt-3"
      >
        Cập nhật trạng thái thanh toán
      </h5>
      <p class="tw-text-[15px] tw-leading-5 tw-text-center">
        A message should be a short, complete sentence.
      </p>
    </div>
    <div class="modal-change-information__form">
      <div class="tw-mt-6 tw-flex-col tw-gap-y-4">
        <g-input label="Số tiền đã thanh toán" v-model="paid"></g-input>
      </div>
      <g-button
        class="tw-mt-5 tw-w-full"
        @click="handlePaidFull"
        :loading="paidFullLoading"
      >
        Thanh toán toàn bộ hóa đơn
      </g-button>
    </div>
    <div
      class="tw-grid tw-grid-cols-2 tw-justify-between tw-gap-x-3 tw-bg-white tw-px-[24px] tw-py-[22px] tw-rounded-b-xl"
    >
      <g-button variant="bezeled" class="tw-w-full" @click="$emit('close')">
        <template #prepend>
          <IconXMark />
        </template>
        Hủy
      </g-button>
      <g-button @click="handleUpdateBillPaidAmount" :loading="loading"
        >Cập nhật</g-button
      >
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import url("./index.scss");
</style>
