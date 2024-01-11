<script setup>
import IconXMark from "@/assets/svg/x-mark.svg";
import { useRoomStore } from "@/store/room";
import { routerKey } from "vue-router";
import { useToast } from "vue-toastification";

const props = defineProps({
  roomInfo: {
    type: Object,
    default: {},
  },
});

const route = useRoute();
const router = useRouter();
const toast = useToast();

const emit = defineEmits(["close"]);

const roomStore = useRoomStore();

const emptyRooms = ref([]);
const newRoom = ref("Chọn phòng");

const getListEmptyRoom = async () => {
  const payload = {
    motelId: props.roomInfo.motelId._id,
  };
  const res = await roomStore.getAllRoomOfMotel(payload);
  if (res.data) {
    emptyRooms.value = res.data.rooms.filter(
      (item) => item._id !== props.roomInfo._id
    );
  }
};

getListEmptyRoom();

const moveMemberInRoom = async () => {
  const payload = {
    idRoomNew: newRoom.value._id,
    idRoomOld: props.roomInfo._id,
    dateMoveRoom: convertDateType(new Date(), "DD/MM/YYYY"),
  };
  if (!payload.idRoomNew) {
    toast.error("Bạn chưa chọn phòng cần chuyển sang!");
    return;
  }
  const res = await roomStore.moveMember(payload);
  if (res.data) {
    toast.success("Chuyển phòng thành công");
    emit("close");
    router.replace(`/quan-ly/${route.params.motelId}/danh-sach-phong`);
  }
  if (res.error) {
    toast.error(res.error.data.message);
  }
};
</script>

<template>
  <div class="tw-rounded-[14px] tw-bg-white">
    <div class="tw-p-6 tw-pt-10">
      <div class="tw-text-center tw-font-extrabold tw-text-[20px]">
        Chuyển thành viên trong phòng
      </div>
      <div class="tw-pt-12">
        <g-autocomplete
          :items="emptyRooms"
          v-model="newRoom"
          item-title="name"
        ></g-autocomplete>
        <div class="tw-w-full tw-mt-3">
          <div class="tw-flex tw-justify-between">
            <g-button
              variant="bezeled"
              @click="$emit('close')"
              class="tw-w-[48%]"
            >
              <template #prepend>
                <IconXMark />
              </template>
              Hủy
            </g-button>
            <g-button @click="moveMemberInRoom" class="tw-w-[48%]">
              Xác nhận
            </g-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
