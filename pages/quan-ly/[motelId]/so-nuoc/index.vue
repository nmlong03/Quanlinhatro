<script setup>
import WaterTable from "@/components/pages/so-nuoc/WaterTable.vue";
import { useWaterStore } from "~/store/water";
import { useMotelStore } from "~/store/motel";
import { useRoomStore } from "@/store/room";
import { useUserStore } from "~/store/user";

// compatibility
const route = useRoute();
const idMotel = route.params?.motelId;
// store
const userStore = useUserStore();
const waterStore = useWaterStore();
const motelStore = useMotelStore();
const userRoom = useRoomStore();
// state
const dataWater = ref(null);
const DateFilter = ref(Date());
const DataMotels = ref(null);
const fetchListWaterEventBus = useEventBus(`fetch-list-water`);
// function
const getAllMotels = async () => {
  try {
    const resOwner = await userStore.getOneUser();
    const res = await motelStore.getMotels(resOwner.data.message._id);
    if (res.data) {
      const motels = res.data.motels;
      const foundMotel = motels.find((motel) => motel._id === idMotel);
      if (foundMotel) {
        DataMotels.value = [
          {
            title: foundMotel.name,
            id: foundMotel._id,
          },
        ];
      } else {
        DataMotels.value = [];
      }
    }
  } catch (error) {
    throw error;
  }
};
getAllMotels();

const getRoomWater = async () => {
  const resRoom = await userRoom.getAllRoomOfMotel({ motelId: idMotel });
  if (resRoom.data) {
    const roomsWithWater = await resRoom.data.rooms.filter(
      (room) =>
        room.serviceIds &&
        room.serviceIds.some((service) => service.type === "NƯỚC")
    );
    const ids = await roomsWithWater.map((obj) => ({
      _id: null,
      motelId: obj.motelId._id,
      prevWaterIndex: 0,
      currentWaterIndex: 0,
      waterUsed: 0,
      monthYear:
        formatMonthYear(DateFilter._rawValue) == "01/1970"
          ? formatMonthYear(Date.now())
          : formatMonthYear(DateFilter._rawValue),

      roomId: {
        _id: obj._id,
        name: obj.name,
        motelId: {
          _id: idMotel,
        },
      },
    }));
    return ids;
  }
};

const getAllWater = async (params) => {
  try {
    const res = await waterStore.getAllWater(
      `motel=${idMotel}&monthDate=${params}&limit=1000000000000&page=1`
    );
    if (res.data) {
      const dataRoomWater = await getRoomWater();
      const dataAvailable = JSON.parse(JSON.stringify(res.data.waterUsages));

      for (let i = 0; i < dataRoomWater.length; i++) {
        const roomElect = dataRoomWater[i];
        // Tìm phần tử trong dataAvailable có roomId._id tương đương
        const correspondingRoom = dataAvailable.find(
          (availableRoom) => availableRoom.roomId._id === roomElect.roomId._id
        );
        // Nếu tìm thấy phần tử tương đương, cập nhật các biến
        if (correspondingRoom) {
          roomElect._id = correspondingRoom._id;
          roomElect.prevWaterIndex = correspondingRoom.prevWaterIndex;
          roomElect.currentWaterIndex = correspondingRoom.currentWaterIndex;
          roomElect.waterUsed = correspondingRoom.waterUsed;
          roomElect.monthYear = correspondingRoom.monthYear;
          // Cập nhật thêm các biến khác nếu cần
        }
      }
      // In mảng dataRoomWater đã cập nhật
      dataWater.value = dataRoomWater;
    }
  } catch (error) {}
};
getAllWater(formatMonthYear(Date()));

const onHandleDate = async (event) => {
  if (DateFilter._value == null) {
    dataWater.value = null;
    getAllWater(formatMonthYear(Date()));
    return;
  } else {
    dataWater.value = null;
    getAllWater(formatMonthYear(DateFilter._value));
  }
};

fetchListWaterEventBus.on(() => {
  dataWater.value = null;
  getAllWater(formatMonthYear(Date()));
});
</script>
<template>
  <div class="tw-flex tw-items-end tw-gap-x-3 tw-mb-3">
    <g-date-picker
      class="tw-pt-4"
      label="Theo tháng"
      :placeholder="formatMonthYear(Date())"
      @vnode-updated="onHandleDate($event)"
      v-model="DateFilter"
    ></g-date-picker>
    <!-- <g-button
      class="!tw-h-[38px] !tw-w-40"
      @click="isDisplayCreateWater = true"
    >
      Cập nhật số nước
    </g-button> -->
  </div>
  <section>
    <WaterTable
      v-if="dataWater !== null"
      :DataMotels="DataMotels"
      :data="dataWater"
    />
    <!-- <div v-if="dataWater == null">
      <h2 class="tw-text-center tw-py-10">Danh sách trống</h2>
    </div> -->
  </section>
  <!-- <v-dialog v-model="isDisplayCreateWater" width="544">
    <CreateWaterForm @close="isDisplayCreateWater = false" />
  </v-dialog> -->
</template>
