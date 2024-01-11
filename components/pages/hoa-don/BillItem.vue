<script setup>
import IconRemove from "@/assets/svg/remove.svg";
import IconEdit from "@/assets/svg/edit.svg";
import IconThreeDots from "@/assets/svg/bill-info.svg";
import { useBillStore } from "@/store/bill";
import { useToast } from "vue-toastification";
import ModalBillInfo from "./ModalBillInfo.vue";
import ModalPaid from "./ModalPaid.vue";
const props = defineProps({
  item: {
    type: Object,
    default: {},
  },
  index: {
    type: Number,
    default: 0,
  },
  services: {
    type: Array,
    default: [],
  },
});

const toast = useToast();
const getBillEventBus = useEventBus(`get-bill-event-bus`);

const billStore = useBillStore();

const billInfo = ref({});
const billId = ref("");
const isShowPaidModal = ref(false);
const isShowConfirmDeleteBill = ref(false);
const isShowBillInfo = ref(false);

const handleDeleteBill = async () => {
  const res = await billStore.deleteBill(billInfo.value._id);
  if (res.data) {
    toast.success("Xóa hóa đơn thành công!");
    getBillEventBus.emit();
    isShowConfirmDeleteBill.value = false;
  }
};
</script>
<template>
  <tr class="tw-relative tw-group hover:tw-bg-[e3e3e3]">
    <td class="tw-text-center">{{ index + 1 }}</td>
    <td>{{ item.roomId?.name }}</td>
    <td>{{ item.memberId?.name }}</td>
    <td>{{ formatCurrency(item.totalBill) }}</td>
    <td>{{ formatCurrency(item.paidAmount) }}</td>
    <td>{{ formatCurrency(item.totalBill - item.paidAmount) }}</td>
    <td>{{ convertPaidStatus(item.isPaid) }}</td>
    <div
      class="tw-absolute tw-right-3 tw-top-[50%] tw-translate-y-[-50%] tw-hidden group-hover:tw-flex tw-space-x-2"
    >
      <div>
        <g-button
          class="!tw-ml-0 !tw-p-3"
          variant="bezeled"
          @click="(isShowBillInfo = true), (billId = item._id)"
        >
          <IconThreeDots />
        </g-button>
      </div>
      <div>
        <g-button
          :loading="loading"
          class="!tw-ml-0 !tw-p-1"
          variant="bezeled"
          @click="(isShowPaidModal = true), (billInfo = item)"
        >
          <IconEdit />
        </g-button>
      </div>
      <div>
        <g-button
          class="!tw-ml-0 !tw-p-1"
          variant="bezeled"
          @click="(isShowConfirmDeleteBill = true), (billInfo = item)"
        >
          <IconRemove class="!tw-ml-0" />
        </g-button>
      </div>
    </div>
  </tr>
  <v-dialog v-model="isShowPaidModal" width="544">
    <ModalPaid @close="isShowPaidModal = false" :billInfo="billInfo" />
  </v-dialog>
  <v-dialog v-model="isShowBillInfo" width="544">
    <ModalBillInfo
      @close="isShowBillInfo = false"
      :billId="billId"
      :services="services"
    />
  </v-dialog>
  <g-modal-confirm
    v-model="isShowConfirmDeleteBill"
    title="Xóa hóa đơn này?"
    description="Một khi đã xóa, không thể hồi lại"
    @ok="handleDeleteBill"
  ></g-modal-confirm>
</template>
