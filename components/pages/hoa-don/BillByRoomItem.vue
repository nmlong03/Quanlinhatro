<script setup>
import IconRemove from "@/assets/svg/remove.svg";
import IconEdit from "@/assets/svg/edit.svg";
import { useBillStore } from "@/store/bill";
import { useToast } from "vue-toastification";
import { debounce } from "lodash";
const props = defineProps({
  item: {
    type: Object,
    default: {},
  },
  index: {
    type: Number,
    default: 0,
  },
  billDate: {
    type: Object,
    default: {},
  },
});

const toast = useToast();

const billStore = useBillStore();

const host = ref({});
const loading = ref(false);

const getRoomHost = () => {
  props.item.memberIds.map((el) => {
    if (el.isHost == true) {
      host.value = el;
      return;
    }
  });
};

getRoomHost();

const handleCreateBill = debounce(async (e) => {
  if (!props.billDate) {
    toast.error("Vui lòng chọn kì thanh toán!");
    return;
  }
  loading.value = true;
  const payload = {
    roomId: e._id,
    monthYear: convertDateType(props.billDate, 'MM/YYYY'),
  };
  const res = await billStore.createMonthlyBill(payload);
  if (res.data) {
    loading.value = false;
    toast.success("Tạo hóa đơn thành công!");
  }
});
</script>
<template>
  <tr class="tw-relative tw-group hover:tw-bg-[e3e3e3]">
    <td class="tw-text-center">{{ index + 1 }}</td>
    <td>{{ item.name }}</td>
    <td>{{ host.name }}</td>
    <td>{{ host.phone }}</td>
    <td>{{ host.email }}</td>
    <div
      class="tw-absolute tw-right-3 tw-top-[50%] tw-translate-y-[-50%] tw-flex tw-space-x-2"
    >
      <div>
        <g-button
          :loading="loading"
          class="!tw-ml-0 !tw-p-1"
          variant="bezeled"
          @click="handleCreateBill(item)"
        >
          <IconEdit />
          Tạo/Cập nhật
        </g-button>
      </div>
      <!-- <div>
        <g-button
          class="!tw-ml-0 !tw-p-1"
          variant="bezeled"
          @click="handleSendingMail(item)"
        >
          <IconRemove class="!tw-ml-0" />
          Gửi hóa đơn
        </g-button>
      </div> -->
    </div>
  </tr>
</template>
