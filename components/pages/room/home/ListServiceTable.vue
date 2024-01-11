<script setup>
import { VDataTable } from "vuetify/lib/labs/components.mjs";
import { useServiceStore } from "@/store/services";
import ServiceItem from "@/components/pages/room/ServiceItem.vue";
import { useRoomStore } from "~/store/room";

const route = useRoute();

const serviceStore = useServiceStore();
const roomStore = useRoomStore();

const headers = [
  {
    title: "STT",
    sortable: false,
    key: "STT",
    width: "73px",
  },
  {
    title: "Tên dịch vụ",
    sortable: false,
    key: "name",
    width: "400px",
  },
  {
    title: "Giá dịch vụ",
    sortable: false,
    key: "price",
    width: "400px",
  },
  {
    title: "Kích hoạt",
    sortable: false,
    key: "activeService",
  },
];
const services = ref([]);
const roomInfo = ref(null);

const getAllService = async () => {
  const payload = {
    isActive: true,
  };
  const res = await serviceStore.getAllServices(payload);
  if (res.data) {
    services.value = res.data.services;
  }
};
getAllService();

const getRoomInfo = async () => {
  const res = await roomStore.getRoomDetail(route.params.roomId);
  if (res.data) {
    roomInfo.value = res.data.room;
  }
};

getRoomInfo();
</script>
<template>
  <v-data-table :headers="headers" class="s-table" :items="services">
    <template #item="{ item, index }">
      <ServiceItem
        :item="item"
        :index="index"
        :roomServices="roomInfo?.serviceIds"
      />
    </template>
  </v-data-table>
</template>
