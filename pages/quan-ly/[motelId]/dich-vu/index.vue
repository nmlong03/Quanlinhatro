<script setup>
import ServiceTable from "@/components/pages/service/ServiceTable.vue";
import IconSearch from "@/assets/svg/search.svg";
import { useServiceStore } from "~/store/services";
import ModalCreateService from "~/components/pages/service/ModalCreateService.vue";

// composable
const fetchListServiceEventBus = useEventBus(`fetch-list-service`);

// state
const dataServices = ref(null);
const isDisplayCreateService = ref(false);

// store
const serviceStore = useServiceStore();
const getAllServices = async () => {
  const res = await serviceStore.getAllServices();
  if (res.data) {
    dataServices.value = res.data.services;
  }
};

getAllServices();
const searchKeyword = ref("");

fetchListServiceEventBus.on(() => {
  getAllServices();
});
const handleSearch = () => {};
</script>
<template>
  <div
    class="tw-flex tw-justify-between tw-mb-3 tw-mr-3 tw-items-center tw-gap-x-3"
  >
    <div class="tw-w-[300px]">
      <g-button @click="isDisplayCreateService = true"
        >Thêm mới dịch vụ</g-button
      >
    </div>
    <!-- <div class="tw-flex">
      <div class="tw-w-[300px]">
        <g-input v-model="searchKeyword"> </g-input>
      </div>
      <div
        class="tw-bg-white tw-rounded-full tw-p-3 tw-cursor-pointer"
        @click="handleSearch"
      >
        <IconSearch />
      </div>
    </div> -->
  </div>
  <div>
    <ServiceTable v-if="dataServices !== null" :data="dataServices" />
  </div>
  <v-dialog v-model="isDisplayCreateService" width="544">
    <ModalCreateService @close="isDisplayCreateService = false" />
  </v-dialog>
</template>
