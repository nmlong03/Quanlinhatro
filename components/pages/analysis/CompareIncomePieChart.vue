<script setup>
import { Doughnut } from "vue-chartjs";
import { useStatisticalStore } from "@/store/statistical";
const data = {
  labels: ["Dịch vụ", "Tiền điện", "Tiền nước", "Tiền phòng"],
  datasets: [
    {
      data: [300, 50, 100, 500],
    },
  ],
};

const statStore = useStatisticalStore();

const getStat = async () => {
  const res = await statStore.getStatistical();
  if (res.data) {
    console.log(res.data);
  }
};
</script>
<template>
  <div class="tw-max-h-[300px]">
    <span class="tw-text-[16px] tw-font-bold">Tổng doanh thu</span>
    <Doughnut :data="data" :options="options" />
  </div>
</template>
