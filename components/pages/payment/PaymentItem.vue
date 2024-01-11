<script setup>
import { useToast } from "vue-toastification";
import { usePaymentStore } from "~/store/payment";
import IconRemove from "@/assets/svg/remove.svg";
import IconEdit from "@/assets/svg/edit.svg";
import ModalUpdatePayment from "./ModalUpdatePayment.vue";

const props = defineProps({
  item: {
    type: Object,
    default: {},
  },
  index: {
    type: Number,
    default: 0,
  },
});

const route = useRoute();
const toast = useToast();
const fetchListPaymentEventBus = useEventBus(`fetch-list-payment`);

const paymentStore = usePaymentStore();

const activeMethod = ref(props.item.isActive);
const isShowModalUpdatePaymentMethod = ref(false);
const paymentInfo = ref({});
const isShowConfirmDeletePaymentMethod = ref(false);

const handleEdit = (e) => {
  paymentInfo.value = e;
  isShowModalUpdatePaymentMethod.value = true;
};

const handleConfirmDeleteMember = (e) => {
  paymentInfo.value = e;
  isShowConfirmDeletePaymentMethod.value = true;
};

const handleRemovePayment = async () => {
  const res = await paymentStore.deletePaymentMethod(paymentInfo.value._id);
  if (res.data) {
    isShowConfirmDeletePaymentMethod.value = false;
    toast.success("Xóa phương thức thanh toán thành công");
    fetchListPaymentEventBus.emit();
  }
};

watch(
  () => activeMethod.value,
  async (newVal) => {
    const payload = {
      isActive: newVal,
    };
    await paymentStore.updatePaymentMethod(props.item._id, payload);
    if (newVal) {
      toast.success("Kích hoạt phương thức thanh toán thành công");
    } else {
      toast.success("Tắt phương thức thanh toán thành công");
    }
  }
);
</script>
<template>
  <tr class="tw-relative tw-group hover:tw-bg-[e3e3e3]">
    <td class="tw-text-center">{{ index + 1 }}</td>
    <td>{{ item.name }}</td>
    <td>{{ item.type }}</td>
    <td>{{ item.details }}</td>
    <td>
      <g-switch v-model="activeMethod" @click="handleActiveStatus"></g-switch>
    </td>
    <div
      class="tw-absolute tw-right-3 tw-top-[50%] tw-translate-y-[-50%] tw-hidden group-hover:tw-flex tw-space-x-2"
    >
      <div>
        <g-button
          class="!tw-ml-0 !tw-p-1"
          variant="bezeled"
          @click="handleEdit(item)"
        >
          <IconEdit />
        </g-button>
      </div>
      <div>
        <g-button
          class="!tw-ml-0 !tw-p-1"
          variant="bezeled"
          @click="handleConfirmDeleteMember(item)"
        >
          <IconRemove class="!tw-ml-0" />
        </g-button>
      </div>
    </div>
  </tr>
  <v-dialog v-model="isShowModalUpdatePaymentMethod" width="544">
    <ModalUpdatePayment
      :item="paymentInfo"
      @close="isShowModalUpdatePaymentMethod = false"
    />
  </v-dialog>
  <g-modal-confirm
    v-model="isShowConfirmDeletePaymentMethod"
    title="Xóa phương thức thanh toán?"
    description="Một khi đã xóa, không thể phục hồi lại"
    @ok="handleRemovePayment(paymentInfo)"
  ></g-modal-confirm>
</template>
