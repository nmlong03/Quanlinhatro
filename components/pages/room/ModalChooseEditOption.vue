<script setup lang="ts">
import IconPhone from "@/assets/svg/phone.svg";
import IconAddUser from "@/assets/svg/add-user.svg";
import IconXMark from "@/assets/svg/x-mark.svg";
import IconDelete from "@/assets/svg/delete.svg";

const props = defineProps({
  roomInfo: {
    type: Object,
    default: {},
  },
});

const isRoomEmpty = ref(true);

if (props.roomInfo.status === "Trống") {
  isRoomEmpty.value = false;
}
</script>

<template>
  <div class="tw-rounded-[14px] tw-bg-white">
    <div class="tw-p-6 tw-pt-10">
      <div class="tw-text-center tw-font-extrabold tw-text-[20px]">
        Chỉnh sửa thông tin phòng
      </div>
      <div class="tw-pt-12">
        <div class="tw-flex tw-flex-col tw-gap-y-3">
          <g-button variant="bezeled" @click="$emit('editRoom')">
            <template #prepend>
              <IconPhone />
            </template>
            <span class="tw-font-semibold">Thay đổi thông tin phòng</span>
          </g-button>
          <g-button variant="bezeled" @click="$emit('addRoomMember')" :disabled="isRoomEmpty">
            <template #prepend>
              <IconAddUser />
            </template>
            <span class="tw-font-semibold"> Thêm chủ phòng trọ </span>
          </g-button>
          <g-button variant="bezeled" @click="$emit('deleteRoom')">
            <template #prepend>
              <IconDelete />
            </template>
            <span class="tw-font-semibold"> Xóa phòng </span>
          </g-button>
        </div>
        <hr class="tw-my-4" />
        <div class="tw-flex tw-flex-col">
          <g-button variant="borderless-blue" @click="$emit('close')">
            <template #prepend>
              <IconXMark />
            </template>
            Hủy
          </g-button>
        </div>
      </div>
    </div>
  </div>
</template>
