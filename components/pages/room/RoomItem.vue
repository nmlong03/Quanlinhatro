<script setup>
import IconUser from "@/assets/svg/profile/user.svg";
import IconGrowArrow from "@/assets/svg/grow-arrow.svg";
import ModalChooseEditOption from "@/components/pages/room/ModalChooseEditOption.vue";
import ModalUpdateRoom from "@/components/pages/room/ModalUpdateRoom.vue";
import ModalAddRoomHost from "@/components/pages/room/ModalAddRoomHost.vue";
import { useRoomStore } from "~/store/room";
import { useToast } from "vue-toastification";

const props = defineProps({
  roomInfo: {
    type: Object,
    default: {},
  },
});

//composable
const route = useRoute();
const router = useRouter();
const fetchListRoomEventBus = useEventBus(
  `fetch-list-room-${route.params.motelId}`
);
const toast = useToast();
//store
const roomStore = useRoomStore();

const isShowChooseEditOption = ref(false);
const isShowUpdateRoom = ref(false);
const isShowAddRoomMember = ref(false);
const isShowConfirmDeleteRoom = ref(false);
const roomOwner = ref(null);

const findRoomOwner = () => {
  props.roomInfo.memberIds.find((el) => {
    if (el.isHost === true) {
      roomOwner.value = el;
    }
  });
};

findRoomOwner();

const handleEnterRoomDetail = () => {
  if (
    props.roomInfo.status === "Trống" ||
    props.roomInfo.status === "Đã đặt cọc"
  ) {
    toast.error("Bạn chưa thêm chủ phòng trọ này!");
    return;
  }
  router.push(`danh-sach-phong/${props.roomInfo._id}`);
};

const handleRemoveRoom = async (e) => {
  const res = await roomStore.deleteRoom(e._id);
  if (res.data) {
    toast.success("Xóa phòng thành công!");
    fetchListRoomEventBus.emit();
    isShowConfirmDeleteRoom.value = false;
    isShowChooseEditOption.value = false;
  }
  if (res.error) {
    toast.error(res.error.data.message);
    isShowConfirmDeleteRoom.value = false;
    isShowChooseEditOption.value = false;
  }
};
</script>
<template>
  <a
    class="tw-block tw-rounded-lg tw-p-4 tw-shadow-indigo-100 tw-shadow-xl tw-min-w-[300px]"
  >
    <img
      @click="handleEnterRoomDetail"
      alt="Home"
      src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
      class="tw-h-56 tw-w-full tw-rounded-md tw-object-cover tw-cursor-pointer"
    />
    <div class="tw-mt-2">
      <dl>
        <div>
          <dt class="tw-sr-only">Price</dt>
          <dd class="tw-text-sm tw-text-gray-500">
            {{ formatCurrency(roomInfo.price) }}/1 tháng
          </dd>
        </div>
        <div>
          <dd class="tw-font-bold">{{ roomInfo.name }}</dd>
          <p>
            <span class="tw-font-bold tw-text-[12px]">Mã phòng:</span>
            {{ roomInfo.verify_code }}
          </p>
          <p v-if="roomOwner">
            <span class="tw-font-bold tw-text-[12px]">Chủ phòng:</span>
            {{ roomOwner.name }}
          </p>
          <p v-else>
            <span class="tw-font-bold tw-text-[12px]">Trạng thái phòng:</span>
            {{ roomInfo.status }}
          </p>
        </div>
      </dl>
      <div
        class="tw-mt-6 tw-flex tw-items-center tw-gap-8 tw-text-xs tw-justify-between"
      >
        <div
          class="sm:tw-inline-flex sm:tw-shrink-0 sm:tw-items-center sm:tw-gap-2"
        >
          <IconUser />
          <div class="tw-mt-1.5 sm:tw-mt-0">
            <p class="text-gray-500">Tối đa</p>
            <p class="font-medium">{{ roomInfo.max_customer }} người</p>
          </div>
        </div>
        <div>
          <g-button variant="bezeled" @click="isShowChooseEditOption = true">
            <span>Chỉnh sửa</span>
          </g-button>
        </div>
      </div>
    </div>
  </a>
  <v-dialog v-model="isShowChooseEditOption" width="544" persistent scrollable>
    <ModalChooseEditOption
      :roomInfo="roomInfo"
      @close="isShowChooseEditOption = false"
      @editRoom="(isShowChooseEditOption = false), (isShowUpdateRoom = true)"
      @addRoomMember="
        (isShowChooseEditOption = false), (isShowAddRoomMember = true)
      "
      @deleteRoom="isShowConfirmDeleteRoom = true"
    />
  </v-dialog>
  <v-dialog v-model="isShowUpdateRoom" width="544" persistent scrollable>
    <ModalUpdateRoom @close="isShowUpdateRoom = false" :roomInfo="roomInfo" />
  </v-dialog>
  <v-dialog v-model="isShowAddRoomMember" width="544" persistent scrollable>
    <ModalAddRoomHost
      @close="isShowAddRoomMember = false"
      :roomInfo="roomInfo"
    />
  </v-dialog>
  <g-modal-confirm
    v-model="isShowConfirmDeleteRoom"
    title="Xóa phòng?"
    description="Một khi đã xóa, không thể hồi lại"
    @ok="handleRemoveRoom(roomInfo)"
  ></g-modal-confirm>
</template>
