<script setup>
import IconClose from "@/assets/svg/close.svg";
import IconXMark from "@/assets/svg/x-mark.svg";
import { useBillStore } from "~/store/bill";
import BillItemField from "@/components/pages/hoa-don/BillItemField.vue";
import { useServiceStore } from "~/store/services";

const props = defineProps({
  billId: {
    type: String,
    default: "",
  },
  services: {
    type: Array,
    default: [],
  },
});

const billStore = useBillStore();
const serviceStore = useServiceStore();

const electricityPrice = computed(() => serviceStore.electricityPrice);
const waterPrice = computed(() => serviceStore.waterPrice);

const billInfo = ref(null);

const getBillInfo = async () => {
  const res = await billStore.getOneBill(props.billId);
  if (res.data) {
    billInfo.value = res.data.billData;
  }
};

getBillInfo();
</script>
<template>
  <div v-if="!billInfo"></div>
  <div v-else class="modal-change-information">
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
        Chi tiết hóa đơn
      </h5>
      <p class="tw-text-[15px] tw-leading-5 tw-text-center">
        A message should be a short, complete sentence.
      </p>
    </div>
    <div class="tw-flex tw-justify-center tw-w-full tw-mt-3">
      <hr class="tw-w-[80%]" />
    </div>
    <div class="modal-change-information__form tw-flex tw-flex-col tw-gap-y-3">
      <BillItemField
        label="Tên chủ phòng"
        :value="billInfo.roomId?.motelId?.name"
      />
      <hr class="tw-mt-3" />
      <BillItemField
        label="Tiền phòng"
        :value="formatCurrency(billInfo.housePrice)"
      />
      <span v-for="item in billInfo.roomId.serviceIds">
        <BillItemField
          v-if="item?.type !== 'ĐIỆN' && item?.type !== 'NƯỚC'"
          :label="'Tiền ' + item.name"
          :value="formatCurrency(item.price)"
        />
      </span>

      <BillItemField
        v-if="billInfo.roomElectricityUsed"
        :label="
          'Số điện đã sử dụng: ' +
          billInfo.roomElectricityUsed?.currentElectricityIndex +
          ' - ' +
          billInfo.roomElectricityUsed?.prevElectricityIndex +
          ' = ' +
          billInfo.roomElectricityUsed?.electricityUsed
        "
        :value="
          formatCurrency(
            billInfo.roomElectricityUsed?.electricityUsed * electricityPrice
          )
        "
      />
      <BillItemField
        v-if="billInfo.roomWaterUsed"
        :label="
          'Số nước đã sử dụng: ' +
          billInfo.roomWaterUsed?.currentWaterIndex +
          ' - ' +
          billInfo.roomWaterUsed?.prevWaterIndex +
          ' = ' +
          billInfo.roomWaterUsed?.waterUsed
        "
        :value="formatCurrency(billInfo.roomWaterUsed?.waterUsed * waterPrice)"
      />
      <BillItemField
        label="Tổng hóa đơn"
        :value="formatCurrency(billInfo.totalBill)"
      />
      <BillItemField
        label="Số tiền đã thanh toán"
        :value="formatCurrency(billInfo.paidAmount)"
      />
      <BillItemField
        label="Số tiền còn lại"
        :value="formatCurrency(billInfo.totalBill - billInfo.paidAmount)"
      />
    </div>
    <!-- <div
      class="tw-grid tw-grid-cols-3 tw-justify-between tw-gap-x-3 tw-bg-white tw-px-[24px] tw-py-[22px] tw-rounded-b-xl"
    >
      <g-button variant="bezeled" class="tw-w-full" @click="$emit('close')">
        <template #prepend>
          <IconXMark />
        </template>
        Đóng
      </g-button>
    </div> -->
  </div>
</template>
<style lang="scss" scoped>
@import url("./index.scss");
</style>
