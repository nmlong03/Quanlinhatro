<script setup>
import { useMotelStore } from "@/store/motel";
import MotelsCard from "@/components/pages/quan-ly/MotelsCard.vue";
import Header from "~/components/global/header/Header.vue";
import Footer from "~/components/global/footer/Footer.vue";
import "@/assets/css/main.css";
import IconAddMotel from "@/assets/svg/add-motel.svg";
import AddMotelForm from "@/components/pages/quan-ly/AddMotelForm.vue";
import { useUserStore } from "~/store/user";

const fetchListMotel = useEventBus(`fetch-list-motel`);

//store
const motelStore = useMotelStore();
const userStore = useUserStore();

const motels = ref(null);
const isDisplayAddMotel = ref(false);

const getAllMotels = async () => {
  await userStore.getOneUser();
  const res = await motelStore.getMotels(userStore.user._id);
  if (res.data) {
    motels.value = res.data.motels;
  }
};
getAllMotels();

fetchListMotel.on(() => {
  motels.value = [];
  getAllMotels();
});
</script>
<template>
  <Header></Header>
  <section
    class="tw-bg-[linear-gradient(193deg,#f5f5f5_0%,#f7dfd0_66%,#dedede_100%)] tw-min-h-[85vh]"
  >
    <aside class="tw-bg-[#f88125]">
      <div
        class="tw-w-full tw-max-w-7xl tw-m-auto tw-flex max-lg:tw-flex-col tw-justify-between tw-items-center"
      >
        <h3
          class="tw-py-3 max-lg:tw-py-2 tw-text-2xl max-lg:tw-text-xl tw-font-medium tw-text-white"
        >
          Danh sách nhà trọ
        </h3>
        <div class="">
          <div class="tw-flex tw-items-center tw-gap-x-3">
            <g-button
              @click="isDisplayAddMotel = true"
              class="tw-w-[220px]"
              variant="bezeled"
            >
              <IconAddMotel class="tw-mr-1" /> Thêm nhà trọ</g-button
            >
            <v-dialog width="544" v-model="isDisplayAddMotel">
              <AddMotelForm @close="isDisplayAddMotel = false" />
            </v-dialog>
            <g-input></g-input>
          </div>
        </div>
      </div>
    </aside>
    <aside
      v-if="!motels || motels.length === 0 || motels.length === undefined"
      class="tw-py-2 tw-px-5 tw-w-full tw-text-center"
    >
      <h2 class="tw-font-semibold tw-py-20 tw-text-gray-600">
        Danh sách trống
      </h2>
    </aside>
    <aside
      v-if="motels && motels.length > 0"
      class="tw-grid tw-grid-cols-2 md:tw-grid-cols-3 lg:tw-grid-cols-4 tw-gap-3 tw-px-3 tw-py-5 tw-w-full"
    >
      <MotelsCard :items="item" v-for="item in motels" />
    </aside>
  </section>
  <Footer></Footer>
</template>
