<script setup>
import { VDataTable } from "vuetify/lib/labs/components.mjs";
import { useMemberStore } from "@/store/member";
import IconRemove from "@/assets/svg/remove.svg";
import IconEdit from "@/assets/svg/edit.svg";
import { useToast } from "vue-toastification";

const props = defineProps({
  roomInfo: {
    type: Object,
    default: {},
  },
});

const headers = [
  {
    title: "STT",
    sortable: false,
    key: "STT",
    width: "73px",
  },
  {
    title: "Họ và tên",
    sortable: false,
    key: "fullName",
    width: "213px",
  },
  {
    title: "Giới tính",
    sortable: false,
    key: "gender",
    width: "150px",
  },
  {
    title: "CMND/CCCD",
    sortable: false,
    key: "identify_code",
    width: "150px",
  },
  {
    title: "Địa chỉ",
    sortable: false,
    key: "address",
    width: "213px",
  },
  {
    title: "Điện thoại",
    sortable: false,
    key: "phone",
    width: "150px",
  },
  {
    title: "Số xe",
    sortable: false,
    key: "vehicle_number",
    width: "150px",
  },
  {
    title: "Ngày bắt đầu",
    sortable: false,
    key: "start_date",
  },
];

const roomMembers = ref([]);

watch(
  () => props.roomInfo,
  (newVal) => {
    roomMembers.value = newVal.memberIds;
  }
);
</script>
<template>
  <v-data-table :headers="headers" class="s-table" :items="roomMembers">
    <template #item="{ item, index }">
      <tr class="tw-relative tw-group hover:tw-bg-[e3e3e3]">
        <td class="tw-text-center">{{ index + 1 }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.gender || "Không có" }}</td>
        <td>{{ item.identify_code || "Không có" }}</td>
        <td>
          {{ item.address || "Không có" }}
        </td>
        <td>{{ item.phone || "Không có" }}</td>
        <td>{{ item.vehicle_number || "Không có" }}</td>
        <td>
          {{ convertDateType(item.date_start, "DD/MM/YYYY") || "Không có" }}
        </td>
      </tr>
    </template>
  </v-data-table>
</template>
