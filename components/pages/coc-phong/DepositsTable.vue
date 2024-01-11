<script setup>
import IconRemove from "@/assets/svg/remove.svg";
import IconEdit from "@/assets/svg/edit.svg";
import IconCheck from "@/assets/svg/check.svg";
import IconXMark from "@/assets/svg/x-mark.svg";
import { VDataTable } from "vuetify/lib/labs/components.mjs";
import { render } from "vue";
import ModalUpdateDeposits from "~/components/pages/coc-phong/ModalUpdateDeposits.vue";
import { useDepositsStore } from "~/store/deposits";
import { useToast } from "vue-toastification";
import IconThreeDots from "@/assets/svg/bill-info.svg";
// composable
const emit = defineEmits("getListDeposit");
const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
});
const toast = useToast();

// store
const depositStore = useDepositsStore();

const tableHeaders = ref([
  {
    title: "STT",
    key: "STT",
    sortable: true,
    width: "30px",
  },
  {
    title: "Trạng thái",
    key: "status",
    sortable: true,
    width: "300px",
  },
  {
    title: "Phòng",
    key: "name_room",
    sortable: true,
    width: "200px",
  },
  {
    title: "Tiền cọc",
    key: "money",
    sortable: true,
    width: "150px",
  },
  {
    title: "Người cọc",
    key: "name",
    sortable: false,
    width: "160px",
  },
  {
    title: "Điện thoại",
    key: "phone",
    sortable: false,
    width: "100px",
  },
  {
    title: "Ghi chú",
    key: "note",
    sortable: false,
    width: "200px",
  },
  {
    title: "Ngày cọc",
    key: "bookingDate",
    sortable: true,
    width: "150px",
  },
  {
    title: "Dự kiến đến",
    key: "checkInDate",
    sortable: true,
    width: "150px",
  },

  {
    title: "Hành động",
    key: "action",
    sortable: false,
    width: "150px",
  },
]);

const isShowConfirmAcceptDeposit = ref(false);
const isShowConfirmDenineDeposit = ref(false);
const isDisplayUpdateDeposits = ref(false);
const roomInfo = ref({});

// function

const handleAcceptDeposit = async () => {
  const payload = {
    status: "Nhận phòng",
  };
  const res = await depositStore.updateDeposits(roomInfo.value._id, payload);
  if (res.data) {
    toast.success("Nhận phòng thành công");
    isShowConfirmAcceptDeposit.value = false;
    emit("getListDeposit");
  }
};

const handleDeniedDeposit = async () => {
  const payload = {
    status: "Hủy",
  };
  const res = await depositStore.deleteDeposits(roomInfo.value._id);
  if (res.data) {
    toast.success("Hủy cọc thành công");
    isShowConfirmDenineDeposit.value = false;
    emit("getListDeposit");
  }
};
</script>

<template>
  <div>
    <v-data-table
      :headers="tableHeaders"
      :items="props.data"
      class="s-table"
      v-if="data"
    >
      <template #item="{ item, index }">
        <tr class="tw-relative tw-group">
          <td class="tw-text-center">{{ index + 1 }}</td>
          <td>
            <span
              v-if="!item.status"
              class="tw-text-red-700 tw-font-semibold tw-cursor-pointer tw-flex tw-items-center tw-gap-x-3 tw-w-[50%]"
            >
              <span>Đang chờ xử lý</span> <IconThreeDots />
              <v-menu activator="parent">
                <div class="tw-bg-white tw-rounded-[10px] tw-flex tw-flex-col">
                  <p
                    class="tw-p-3 tw-cursor-pointer hover:tw-bg-[#eeeeee] tw-rounded-t-[10px]"
                    @click="
                      (isShowConfirmAcceptDeposit = true), (roomInfo = item)
                    "
                  >
                    Nhận phòng
                  </p>
                  <p
                    class="tw-p-3 tw-cursor-pointer hover:tw-bg-[#eeeeee] tw-rounded-b-[10px]"
                    @click="
                      (isShowConfirmDenineDeposit = true), (roomInfo = item)
                    "
                  >
                    Hủy
                  </p>
                </div>
              </v-menu>
            </span>
            <div v-else>
              <span
                v-if="item.status.includes('Nhận phòng')"
                class="tw-text-green-700 tw-font-semibold"
                >{{ item?.status }}</span
              >
              <span
                v-if="item.status.includes('Hủy')"
                class="tw-text-red-700 tw-font-semibold"
                >{{ item?.status }}</span
              >
            </div>
          </td>
          <td>{{ item?.roomId?.name }}</td>
          <td>{{ formatCurrency(item?.money) }}</td>
          <td>{{ item?.name }}</td>
          <td>{{ item?.phone }}</td>
          <td>{{ item?.note }}</td>
          <td>{{ item?.bookingDate }}</td>
          <td>{{ item?.expectedArrivalDate }}</td>
          <td class="tw-flex tw-justify-center tw-items-center">
            <span class="tw-flex tw-gap-x-3" v-if="!item.status">
              <g-button
                @click="(isDisplayUpdateDeposits = true), (roomInfo = item)"
                variant="bezeled"
                size="none"
              >
                <IconEdit />
              </g-button>
            </span>
          </td>
        </tr>
      </template>
    </v-data-table>
    <v-dialog v-model="isDisplayUpdateDeposits" width="544">
      <ModalUpdateDeposits
        @close="isDisplayUpdateDeposits = false"
        :roomInfo="roomInfo"
      />
    </v-dialog>
    <g-modal-confirm
      v-model="isShowConfirmAcceptDeposit"
      title="Chuyển người cọc thành chủ phòng?"
      description="Hành động không thể hoàn tác"
      @ok="handleAcceptDeposit"
    ></g-modal-confirm>
    <g-modal-confirm
      v-model="isShowConfirmDenineDeposit"
      title="Hủy bỏ cọc?"
      description="Hành động không thể hoàn tác"
      @ok="handleDeniedDeposit"
    ></g-modal-confirm>
  </div>
</template>
