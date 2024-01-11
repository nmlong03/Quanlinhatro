<script setup>
import { VDataTable } from "vuetify/lib/labs/components.mjs";
import { useServiceStore } from "@/store/services";
import ServiceItem from "@/components/pages/room/ServiceItem.vue";
import { useRoomStore } from "~/store/room";
import { useAssetStore } from "~/store/assets";
import AssetItem from "../AssetItem.vue";

const route = useRoute();

const assetStore = useAssetStore();
const roomStore = useRoomStore();

const headers = [
  {
    title: "STT",
    sortable: false,
    key: "STT",
    width: "73px",
  },
  {
    title: "Tên tài sản",
    sortable: false,
    key: "name",
    width: "400px",
  },
  {
    title: "Giá tài sản",
    sortable: false,
    key: "price",
  },
  {
    title: "Ghi chú",
    sortable: false,
    key: "description",
  },
  {
    title: "Kích hoạt",
    sortable: false,
    key: "activeService",
  },
];
const assets = ref([]);
const roomInfo = ref(null);

const getAllAssets = async () => {
  const res = await assetStore.getAllAssets();
  if (res.data) {
    assets.value = res.data.listInterior;
  }
};

getAllAssets();

const getRoomInfo = async () => {
  const res = await roomStore.getRoomDetail(route.params.roomId);
  if (res.data) {
    roomInfo.value = res.data.room;
  }
};

getRoomInfo();
</script>
<template>
  <v-data-table
    :headers="headers"
    class="s-table"
    :items="assets"
    v-if="roomInfo"
  >
    <template #item="{ item, index }">
      <AssetItem
        :item="item"
        :index="index"
        :roomAssets="roomInfo?.interiorIds"
      />
    </template>
  </v-data-table>
</template>
