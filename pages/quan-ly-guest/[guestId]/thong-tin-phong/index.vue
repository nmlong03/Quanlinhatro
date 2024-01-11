<script setup>
import IconBorder from "@/assets/svg/border.svg";
import {
  VCard,
  VTabs,
  VTab,
  VCardText,
  VWindow,
  VWindowItem,
} from "vuetify/lib/components";
``;
import ListMemberTable from "~/components/pages/guest/ListMemberTable.vue";
import WaterTable from "@/components/pages/guest/WaterTable.vue";
import ElectricityTable from "@/components/pages/guest/ElectricityTable.vue";
import { useToast } from "vue-toastification";
import { useGuestStore } from "~/store/guest";

definePageMeta({
  layout: "guest",
});

//composable
const route = useRoute();
const toast = useToast();

//store

const guestStore = useGuestStore();

//state
const tab = ref({});
const room = ref({});
const roomFactorList = ref([
  {
    _id: "1",
    title: "Danh sách thành viên",
    value: "MEMBERS",
  },
  {
    _id: "2",
    title: "Số điện",
    value: "ELECTRICITY",
  },
  {
    _id: "3",
    title: "Số nước",
    value: "WATER",
  },
]);

const listComponent = {
  MEMBERS: ListMemberTable,
  ELECTRICITY: ElectricityTable,
  WATER: WaterTable,
};

//method
const getRoomDetail = async () => {
  const res = await guestStore.guestRoomInfo();
  if (res.data) {
    room.value = res.data.message;
  }
};

getRoomDetail();
</script>
<template>
  <div class="">
    <div class="tw-px-5">
      <div class="tw-pr-5 tw-mt-8 tw-space-y-3">
        <span class="tw-text-[20px] tw-font-extrabold">{{ room.name }}</span>
        <div class="tw-flex tw-space-x-4 tw-items-center">
          <div class="tw-flex tw-flex-col">
            <span class="small-text">Số thành viên</span>
            <span class="large-text">{{ room.memberIds?.length }}</span>
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
          <!-- <g-button
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
          </g-button> -->
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
              <component :is="listComponent[item.value]" :roomInfo="room">
              </component>
            </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>
<style scoped>
@import url("./index.scss");
</style>
