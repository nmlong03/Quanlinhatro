<script setup>
import IconBorder from "@/assets/svg/border.svg";
import { useRoomStore } from "@/store/room";
import IconSetting from "@/assets/svg/setting.svg";
import ModalAddRoomMember from "@/components/pages/room/ModalAddRoomMember.vue";
import {
  VCard,
  VTabs,
  VTab,
  VCardText,
  VWindow,
  VWindowItem,
} from "vuetify/lib/components";
``;
import ListMemberTable from "@/components/pages/room/home/ListMemberTable.vue";
import ListServiceTable from "@/components/pages/room/home/ListServiceTable.vue";
import RoomContract from "~/components/pages/room/home/RoomContract.vue";
import ModalChangeRoom from "~/components/pages/room/ModalChangeRoom.vue";
import { useLiquidateStore } from "~/store/liquidate-bill";
import { useToast } from "vue-toastification";
import ListAssetTable from "~/components/pages/room/home/ListAssetTable.vue";

//composable
const route = useRoute();
const toast = useToast();
const router = useRouter();

const fetchRoomEventBus = useEventBus(`fetch-room-${route.params.roomId}`);

//store
const roomStore = useRoomStore();
const liquidateStore = useLiquidateStore();

//state
const tab = ref("");
const room = ref({});
const isShowAddMemberInRoom = ref(false);
const isShowModalChangeRoom = ref(false);
const isFullMember = ref(false);
const isShowModalConfirmLiquidate = ref(false);
const isShowModalConfirmReturnRoom = ref(false);
const roomFactorList = ref([
  {
    _id: "1",
    title: "Danh sách thành viên",
    value: "MEMBERS",
  },
  {
    _id: "2",
    title: "Danh sách dịch vụ",
    value: "SERVICES",
  },
  {
    _id: "3",
    title: "Nội thất",
    value: "ASSET",
  },
  {
    _id: "4",
    title: "Hợp đồng",
    value: "CONTRACT",
  },
]);

const listComponent = {
  MEMBERS: ListMemberTable,
  SERVICES: ListServiceTable,
  CONTRACT: RoomContract,
  ASSET: ListAssetTable,
};

//method
const getRoomDetail = async () => {
  const res = await roomStore.getRoomDetail(route.params.roomId);
  if (res.data) {
    room.value = res.data.room;
    if (room.value.max_customer == room.value.memberIds.length) {
      isFullMember.value = true;
    }
  }
};

getRoomDetail();

const handleCreateLiquidateBill = async () => {
  const date = new Date();
  const payload = {
    roomId: route.params.roomId,
    dateReturnRoom: convertDateType(date, "DD/MM/YYYY"),
  };
  const res = await liquidateStore.createLiquidateBill(payload);
  if (res.data) {
    isShowModalConfirmLiquidate.value = false;
    toast.success("Tạo hóa đơn thanh lý phòng thành công!");
    await liquidateStore.sendingLiquidateBillMail(res.data.liquidateBill._id);
    // await roomStore.returnRoom(route.params.roomId);
    // router.replace(``);
  }
  if (res.error) {
    toast.error(res.error.data.message);
  }
};

const handleReturnRoom = async () => {
  const res = await roomStore.returnRoom(route.params.roomId);
  if (res.data) {
    isShowModalConfirmReturnRoom.value = false;
    toast.success("Trả phòng trọ thành công");
    useRouter().back();
  }
};

fetchRoomEventBus.on(() => {
  getRoomDetail();
});
</script>
<template>
  <div class="tw-pt-[50px]">
    <div class="tw-px-5">
      <div class="tw-pb-4">
        <h5 class="tw-text-[20px] tw-font-extrabold tw-mb-2">
          Quản lý phòng trọ
        </h5>
        <p class="title">Quản lý phòng trọ</p>
      </div>
      <hr />
      <div class="tw-pr-5 tw-mt-8 tw-space-y-3">
        <span class="tw-text-[20px] tw-font-extrabold">{{ room.name }}</span>
        <div class="tw-flex tw-space-x-4 tw-items-center">
          <div class="tw-flex tw-flex-col">
            <span class="small-text">Số thành viên</span>
            <span class="large-text">{{ room.memberIds?.length }}</span>
          </div>
          <IconBorder />
          <div class="tw-flex tw-flex-col">
            <span class="small-text">Trạng thái</span>
            <span class="large-text">{{ room.status }}</span>
          </div>
          <IconBorder />
          <div class="tw-flex tw-flex-col">
            <span class="small-text">Mã phòng</span>
            <span class="large-text">{{ room.verify_code }}</span>
          </div>
        </div>
      </div>
      <div class="tw-mt-6">
        <div class="tw-flex tw-space-x-3">
          <!-- <g-button
            label=""
            variant="bezeled"
            @click="showUpdateClassModal = true"
          >
            <template #prepend>
              <IconSetting />
            </template>
            <span class="tw-text-[14px] tw-font-semibold"
              >Chỉnh sửa thông tin phòng</span
            >
          </g-button> -->
          <g-button
            variant="filled"
            @click="isShowAddMemberInRoom = true"
            :disabled="isFullMember"
          >
            <span class="tw-text-[14px] tw-font-semibold">Thêm thành viên</span>
          </g-button>
          <g-button variant="filled" @click="isShowModalChangeRoom = true">
            <span class="tw-text-[14px] tw-font-semibold"
              >Chuyển phòng trọ</span
            >
          </g-button>
          <g-button
            variant="filled"
            @click="isShowModalConfirmLiquidate = true"
          >
            <span class="tw-text-[14px] tw-font-semibold">
              Thanh lý phòng trọ
            </span>
          </g-button>
          <g-button
            variant="filled"
            @click="isShowModalConfirmReturnRoom = true"
          >
            <span class="tw-text-[14px] tw-font-semibold"> Trả phòng </span>
          </g-button>
        </div>
      </div>
    </div>
    <div class="tw-pt-[24px]">
      <v-card class="conduct-table">
        <v-tabs v-model="tab" class="s-tabs" id="">
          <v-tab v-for="item in roomFactorList" :value="item._id">
            <span class="tw-flex tw-items-center">{{ item.title }}</span>
          </v-tab>
        </v-tabs>
        <hr />
        <v-card-text class="conduct-v-card-text">
          <v-window v-model="tab">
            <v-window-item v-for="item in roomFactorList" :value="item._id">
              <component
                :is="listComponent[item.value]"
                @fetchRoomDetail="getRoomDetail()"
                :roomInfo="room"
              >
              </component>
            </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>
    </div>
  </div>
  <v-dialog v-model="isShowAddMemberInRoom" width="544">
    <ModalAddRoomMember
      @close="isShowAddMemberInRoom = false"
      @fetchRoomData="
        getRoomDetail();
        getAllMemberInRoom();
      "
    />
  </v-dialog>
  <v-dialog v-model="isShowModalChangeRoom" width="544">
    <ModalChangeRoom
      @close="isShowModalChangeRoom = false"
      @fetchRoomData="
        getRoomDetail();
        getAllMemberInRoom();
      "
      :roomInfo="room"
    />
  </v-dialog>
  <g-modal-confirm
    v-model="isShowModalConfirmLiquidate"
    title="Thanh lý phòng này?"
    description="Hành động này không thể hoàn tác!"
    @ok="handleCreateLiquidateBill"
  ></g-modal-confirm>
  <g-modal-confirm
    v-model="isShowModalConfirmReturnRoom"
    title="Trả phòng?"
    description="Hành động này không thể hoàn tác!"
    @ok="handleReturnRoom"
  >
  </g-modal-confirm>
</template>
<style scoped>
@import url("./index.scss");
</style>
