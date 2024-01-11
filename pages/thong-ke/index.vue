<script setup>
import IncomeBarChart from "@/components/pages/analysis/IncomeBarChart.vue";
import CompareIncomePieChart from "@/components/pages/analysis/CompareIncomePieChart.vue";
import { useRoomStore } from "@/store/room";
import RoomStatusPieChart from "@/components/pages/analysis/RoomStatusPieChart.vue";
import { useStatisticalStore } from "~/store/statistical";

//composable
const route = useRoute();

const roomStore = useRoomStore();
const statisticalStore = useStatisticalStore();

//state
const roomData = ref({});
const revenueData = ref({});

const getRoomStatic = async () => {
  const res = await roomStore.getRoomStatic();
  if (res.data) {
    roomData.value = res.data.result;
  }
};
getRoomStatic();

const getRevenueInfo = async () => {
  const res = await statisticalStore.getStatistical();
  if (res.data) {
    revenueData.value = res.data.message;
  }
};

getRevenueInfo();

const handleBack = () => {
  useRouter().back();
};
</script>
<template>
  <div class="tw-mt-3 tw-p-5">
    <div class="tw-ml-5">
      <g-button @click="handleBack">Trở về trang quản lý</g-button>
    </div>
    <div class="tw-p-5 tw-ml-5">
      <span class="tw-text-[30px] tw-font-bold">Thống kê</span>
    </div>
    <div class="tw-grid tw-grid-cols-2 tw-gap-4">
      <div class="tw-p-10 tw-bg-white tw-rounded-xl">
        <IncomeBarChart
          :roomData="roomData"
          :revenueData="revenueData"
        />
      </div>
      <div class="tw-p-10 tw-bg-white tw-rounded-xl">
        <CompareIncomePieChart :roomData="roomData" />
      </div>
      <!-- <div class="tw-p-10 tw-bg-white tw-rounded-xl">
        <RoomStatusPieChart :roomData="roomData" />
      </div> -->
    </div>
  </div>
</template>
