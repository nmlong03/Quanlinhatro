<script setup>
import ElectricTable from "@/components/pages/so-dien/ElectricityTable.vue";
import { useElectricityStore } from "~/store/electricity";
import { useMotelStore } from "@/store/motel";
import { useRoomStore } from "@/store/room";
import { useUserStore } from "~/store/user";
import toast from "~/plugins/toast";

// compatibility
const route = useRoute();
const idMotel = route.params?.motelId;
// store
const userStore = useUserStore();
const userRoom = useRoomStore();
const electricityStore = useElectricityStore();
const motelStore = useMotelStore();
// state
const dataElectricity = ref(null);
const DateFilter = ref(Date());
const DataMotels = ref(null);
const keySearch = ref("");
const fetchListElectricityEventBus = useEventBus(`fetch-list-electricity`);
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
const getRoomElec = async () => {
  const resRoom = await userRoom.getAllRoomOfMotel({ motelId: idMotel });
  if (resRoom.data) {
    const roomsWithElectricity = await resRoom.data.rooms.filter(
      (room) =>
        room.serviceIds &&
        room.serviceIds.some((service) => service.type === "ĐIỆN")
    );
    const ids = await roomsWithElectricity.map((obj) => ({
      _id: null,
      motelId: obj.motelId._id,
      prevElectricityIndex: 0,
      currentElectricityIndex: 0,
      electricityUsed: 0,
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

const getAllElectricity = async (params) => {
  try {
    const res = await electricityStore.getAllElectricity(
      `motel=${idMotel}&monthDate=${params}&limit=10000000000000&page=1`
    );
    if (res.data) {
      dataElectricity.value = null;
      const dataRoomElect = await getRoomElec();
      const dataAvailable = JSON.parse(
        JSON.stringify(res.data.electricityUsages)
      );

      for (let i = 0; i < dataRoomElect.length; i++) {
        const roomElect = dataRoomElect[i];
        // Tìm phần tử trong dataAvailable có roomId._id tương đương
        const correspondingRoom = dataAvailable.find(
          (availableRoom) => availableRoom.roomId._id === roomElect.roomId._id
        );
        // Nếu tìm thấy phần tử tương đương, cập nhật các biến
        if (correspondingRoom) {
          roomElect._id = correspondingRoom._id;
          roomElect.prevElectricityIndex =
            correspondingRoom.prevElectricityIndex;
          roomElect.currentElectricityIndex =
            correspondingRoom.currentElectricityIndex;
          roomElect.electricityUsed = correspondingRoom.electricityUsed;
          roomElect.monthYear = correspondingRoom.monthYear;
          // Cập nhật thêm các biến khác nếu cần
        }
      }
      // In mảng dataRoomElect đã cập nhật
      dataElectricity.value = dataRoomElect;
    }
  } catch (error) {}
};
getAllElectricity(formatMonthYear(Date()));

const onHandleDate = async (event) => {
  if (DateFilter._value == null) {
    dataElectricity.value = null;
    getAllElectricity(formatMonthYear(Date()));
    return;
  } else {
    dataElectricity.value = null;
    getAllElectricity(formatMonthYear(DateFilter._value));
  }
};

fetchListElectricityEventBus.on(() => {
  dataElectricity.value = null;
  getAllElectricity(formatMonthYear(Date()));
});
const searchRoom = async () => {
  const dataCore = JSON.parse(JSON.stringify(dataElectricity));
  const cs = searchAndSortByName(
    dataCore._rawValue,
    JSON.parse(JSON.stringify(keySearch))._rawValue
  );
};
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
    <!-- <g-input
      type="text"
      v-on:keyup.enter="searchRoom"
      v-model="keySearch"
      placeholder="Nhập tên phòng trọ"
    >
    </g-input> -->
  </div>
  <section>
    <ElectricTable
      v-if="dataElectricity !== null"
      :DataMotels="DataMotels"
      :data="dataElectricity"
    />
  </section>
</template>
