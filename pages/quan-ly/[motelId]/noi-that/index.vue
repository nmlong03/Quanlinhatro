<script setup>
import AssetTable from "@/components/pages/noi-that/home/AssetTable.vue";
import ModalCreateAsset from "~/components/pages/noi-that/ModalCreateAsset.vue";

// composable

// state
const assets = ref(null);
const isDisplayCreateAsset = ref(false);

// store
</script>
<template>
  <div
    class="tw-flex tw-justify-between tw-mb-3 tw-mr-3 tw-items-center tw-gap-x-3"
  >
    <div class="tw-w-[300px]">
      <g-button @click="isDisplayCreateAsset = true"
        >Thêm mới nội thất</g-button
      >
    </div>
  </div>
  <div>
    <AssetTable />
  </div>
  <v-dialog v-model="isDisplayCreateAsset" width="544">
    <ModalCreateAsset @close="isDisplayCreateAsset = false" />
  </v-dialog>
</template>
