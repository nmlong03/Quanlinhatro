<script setup>
import { Bar } from "vue-chartjs";

const props = defineProps({
  revenueData: {
    type: Array,
    default: [],
  },
});

const chartData = ref({
  labels: ["Tháng 08", "Tháng 09", "Tháng 10", "Tháng 11", "Tháng 12"],
  datasets: [
    {
      label: "Data One",
      backgroundColor: "#f87979",
      data: [0, 0, 0, 0, 0],
    },
  ],
});
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: true,
});

watch(
  () => props.revenueData,
  (newVal) => {
    chartData.value = {
      labels: ["Tháng 08", "Tháng 09", "Tháng 10", "Tháng 11", "Tháng 12"],
      datasets: [
        {
          label: "Data One",
          backgroundColor: "#f87979",
          data: [
            props.revenueData[7].totalRevenue,
            props.revenueData[8].totalRevenue,
            props.revenueData[9].totalRevenue,
            props.revenueData[10].totalRevenue,
            props.revenueData[11].totalRevenue,
          ],
        },
      ],
    };
  }
);
</script>
<template>
  <div class="tw-max-h-[300px]">
    <span class="tw-text-[16px] tw-font-bold">Doanh thu 5 tháng gần nhất</span>
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
