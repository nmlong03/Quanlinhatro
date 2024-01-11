<script setup>
import { Doughnut } from "vue-chartjs";

const props = defineProps({
  roomData: {
    type: Object,
    default: {},
  },
});

const data = {
  labels: ["Phòng trống", "Phòng đang thuê", "Phòng đang sửa chữa", "Phòng đang cọc"],
  datasets: [
    {
      data: [props.roomData.emptyRooms, props.roomData.rentingRooms, props.roomData.repairRoom, props.roomData.depositRooms],
    },
  ],
};

const options = {};
</script>
<template>
  <div class="tw-max-h-[300px]">
    <span class="tw-text-[16px] tw-font-bold">Tổng doanh thu</span>
    <Doughnut :data="data" :options="options" />
  </div>
</template>
