<script setup>
import { VDataTable } from "vuetify/lib/labs/components.mjs";
import { useGuestStore } from "~/store/guest";

const props = defineProps({
  roomInfo: {
    type: Object,
    default: {},
  },
});

const guestStore = useGuestStore();

const headers = [
  {
    title: "STT",
    sortable: false,
    key: "STT",
    width: "73px",
  },
  {
    title: "Kì",
    sortable: false,
    key: "monthYear",
    width: "213px",
  },
  {
    title: "Số nước cũ",
    sortable: false,
    key: "oldElec",
    width: "150px",
  },
  {
    title: "Số nước mới",
    sortable: false,
    key: "newElec",
    width: "150px",
  },
  {
    title: "Số nước đã sử dụng",
    sortable: false,
    key: "usedElec",
    width: "150px",
  },
];

const waterInfo = ref([]);

const getWaterInfo = async () => {
  const res = await guestStore.guestRoomWater();
  if (res.data) {
    waterInfo.value = res.data.data;
  }
};

getWaterInfo();
</script>
<template>
  <v-data-table :headers="headers" class="s-table" :items="waterInfo">
    <template #item="{ item, index }">
      <tr class="tw-relative tw-group hover:tw-bg-[e3e3e3]">
        <td class="tw-text-center">{{ index + 1 }}</td>
        <td>{{ item.monthYear }}</td>
        <td>{{ item.prevElectricityIndex }}</td>
        <td>{{ item.currentElectricityIndex }}</td>
        <td>{{ item.electricityUsed }}</td>
      </tr>
    </template>
  </v-data-table>
</template>
