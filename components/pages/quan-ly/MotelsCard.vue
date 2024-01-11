<script setup>
import IconEditMotel from "@/assets/svg/edit-motel.svg";
import IconManagerMotel from "@/assets/svg/manager-motel.svg";
import IconDeleteMotel from "@/assets/svg/delete-motel.svg";
import IconAddressMotel from "@/assets/svg/address-motel.svg";
import IconHomeMotel from "@/assets/svg/home-motel.svg";
import DeleteMotelForm from "@/components/pages/quan-ly/DeleteMotelFrom.vue";
import UpdateMotelForm from "@/components/pages/quan-ly/UpdateMotelForm.vue";
const props = defineProps({
  items: {
    type: Object,
    default: {},
  },
});
const item = props.items;

const isDisplayDeleteMotel = ref(false);
const isDisplayUpdateMotel = ref(false);

const closePopupAll = () => {
  isDisplayDeleteMotel.value = false;
  isDisplayUpdateMotel.value = false;
};
</script>
<template>
  <div class="tw-flex tw-flex-col tw-bg-white tw-rounded-xl tw-p-4">
    <nuxt-link :to="`/quan-ly/${item._id}/danh-sach-phong`">
      <img
        class="tw-rounded-xl"
        src="https://cafefcdn.com/thumb_w/640/203337114487263232/2021/3/3/photo1614738126212-16147381266471125055486.jpg"
      />
    </nuxt-link>
    <div class="tw-pt-5 tw-px-5">
      <div>
        <div class="tw-flex tw-items-center tw-gap-2">
          <IconHomeMotel />
          <h5 class="tw-line-clamp-1">
            {{ item.name }}
          </h5>
        </div>
      </div>
      <div class="tw-pt-3">
        <span class="me-1">{{ item?.roomIds?.length }} phòng</span>
        <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
      </div>
    </div>
    <div>
      <div class="tw-flex tw-items-center tw-gap-3 tw-p-5">
        <IconAddressMotel />
        <h5 class="tw-line-clamp-2">
          {{ `${item.address}, ${item.ward}, ${item.district}, ${item.city} ` }}
        </h5>
      </div>

      <div
        class="tw-mt-auto tw-flex tw-w-full tw-py-2 tw-gap-1 tw-px-3 tw-justify-between"
      >
        <g-button @click="isDisplayUpdateMotel = true" variant="bezeled">
          <template #prepend>
            <IconEditMotel />
          </template>
          Chỉnh sửa
        </g-button>
        <g-button @click="isDisplayDeleteMotel = true" class="tw-bg-red-500">
          <template #prepend>
            <IconDeleteMotel />
          </template>
          Xoá
        </g-button>
      </div>
    </div>
  </div>
  <v-dialog width="544" v-model="isDisplayUpdateMotel">
    <UpdateMotelForm
      :motelInfo="item"
      :closePopupAll="closePopupAll"
      @close="isDisplayUpdateMotel = false"
    />
  </v-dialog>
  <v-dialog width="544" v-model="isDisplayDeleteMotel">
    <DeleteMotelForm :item="item" @close="isDisplayDeleteMotel = false" />
  </v-dialog>
</template>

<style scoped></style>
