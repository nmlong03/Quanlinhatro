<script setup>
import RoomItem from "@/components/pages/room/RoomItem.vue";
import IconFilter from "@/assets/svg/filter.svg";
import IconSearch from "@/assets/svg/search.svg";
import { useRoomStore } from "~/store/room";
import ModalCreateRoom from "@/components/pages/room/ModalCreateRoom.vue";

//composable
const route = useRoute();
const fetchListRoomEventBus = useEventBus(
  `fetch-list-room-${route.params.motelId}`
);

//store
const roomStore = useRoomStore();

const roomStatus = ref(null);
const payingStatus = ref(null);
const isShowFilter = ref(false);
const isDisplayCreateRoom = ref(false);
const rooms = ref(null);
const roomStatusOptions = ref([
  {
    value: "",
    status: "Tất cả"
  },
  {
    value: "Trống",
    status: "Còn trống",
  },
  {
    value: "Đã có người ở",
    status: "Đã có người ở",
  },
    {
    value: "Đang sửa",
    status: "Đang sửa",
  },
    {
    value: "Đã đặt cọc",
    status: "Đã đặt cọc",
  },
]);

const payingStatusOptions = ref([
  {
    value: true,
    status: "Đã thanh toán",
  },
  {
    value: false,
    status: "Chưa thanh toán",
  },
]);

const getAllRoomOfMotel = async (query) => {
  const payload = {
    motelId: route.params.motelId,
    status: query?.status
  }
  const res = await roomStore.getAllRoomOfMotel(payload);
  if (res.data) {
    rooms.value = res.data.rooms;
  }
};

getAllRoomOfMotel();

const handleFilter = () => {
  const query = {
    status: roomStatus.value.value,
  };
  getAllRoomOfMotel(query);
};

fetchListRoomEventBus.on(() => {
  getAllRoomOfMotel();
});
</script>
<template>
  <div class="tw-w-full">
    <div class="tw-flex tw-items-center tw-gap-x-3 tw-justify-between tw-mb-3">
      <g-button variant="bezeled" @click="isShowFilter = !isShowFilter">
        <template #default>
          <IconFilter />
        </template>
      </g-button>
    </div>
    <div
      class="tw-w-full tw-p-5 tw-bg-white tw-rounded-xl tw-flex tw-flex-col tw-gap-y-3"
      v-if="isShowFilter"
    >
      <div class="tw-flex tw-items-center tw-justify-between">
        <div class="tw-flex tw-items-center tw-gap-x-4">
          <!-- <select name="" id="" class="tw-py-2 tw-pl-4 tw-pr-10 tw-bg-[#e3e3e3] tw-rounded-lg tw-outline-none">
        <option value="">Còn trống</option>
        <option value="">Đã cho thuê</option>
      </select> -->
          <div class="tw-w-[250px]">
            <g-autocomplete
              :items="roomStatusOptions"
              v-model="roomStatus"
              item-title="status"
              label="Trạng thái phòng"
            ></g-autocomplete>
          </div>
          <!-- <div class="tw-w-[250px]">
            <g-autocomplete
              :items="payingStatusOptions"
              v-model="payingStatus"
              item-title="status"
              label="Trạng thái thanh toán"
            ></g-autocomplete>
          </div> -->
        </div>
        <g-button variant="bezeled" @click="handleFilter">
          <template #default>
            <IconSearch />
          </template>
        </g-button>
      </div>
    </div>
    <div class="tw-flex tw-w-full tw-max-w-[250px] tw-my-[12px]">
      <g-button @click="isDisplayCreateRoom = true">
        <span>Thêm phòng</span>
      </g-button>
    </div>
    <div class="tw-w-full tw-flex tw-flex-wrap tw-gap-3">
      <RoomItem v-for="item in rooms" :roomInfo="item" />
    </div>
  </div>
  <v-dialog v-model="isDisplayCreateRoom" width="544">
    <ModalCreateRoom @close="isDisplayCreateRoom = false" />
  </v-dialog>
</template>
