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
    title: "Số điện cũ",
    sortable: false,
    key: "oldElec",
    width: "150px",
  },
  {
    title: "Số điện mới",
    sortable: false,
    key: "newElec",
    width: "150px",
  },
  {
    title: "Số điện đã sử dụng",
    sortable: false,
    key: "usedElec",
    width: "150px",
  },
];

const electricityInfo = ref([]);

const getElectricityInfo = async () => {
  const res = await guestStore.guestRoomElectricity();
  if (res.data) {
    electricityInfo.value = res.data.data;
  }
};

getElectricityInfo();
</script>
<template>
  <v-data-table :headers="headers" class="s-table" :items="electricityInfo">
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
