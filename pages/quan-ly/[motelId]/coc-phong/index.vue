<script setup>
import DepositsTable from "@/components/pages/coc-phong/DepositsTable.vue";
import IconSearch from "@/assets/svg/search.svg";
import { useDepositsStore } from "~/store/deposits";
import ModalCreateDeposits from "~/components/pages/coc-phong/ModalCreateDeposits.vue";

// composable
const fetchListDepositsEventBus = useEventBus(`fetch-list-deposits`);

// state
const dataDeposits = ref(null);
const isDisplayCreateDeposits = ref(false);
const route = useRoute();

// store
const depositsStore = useDepositsStore();
const getAllDeposits = async () => {
  const params = `?motelId=${route.params.motelId}`;
  const res = await depositsStore.getAllDeposits(params);
  if (res.data) {
    dataDeposits.value = res.data.deposit;
  }
};

getAllDeposits();

fetchListDepositsEventBus.on(() => {
  getAllDeposits();
});
</script>
<template>
  <div
    class="tw-flex tw-justify-between tw-mb-3 tw-mr-3 tw-items-center tw-gap-x-3"
  >
    <div class="tw-w-[300px]">
      <g-button @click="isDisplayCreateDeposits = true">Đặt cọc phòng</g-button>
    </div>
  </div>
  <div>
    <DepositsTable
      v-if="dataDeposits !== null"
      :data="dataDeposits"
      @getListDeposit="getAllDeposits"
    />
  </div>
  <v-dialog v-model="isDisplayCreateDeposits" width="544">
    <ModalCreateDeposits
      :roomDeposits="dataDeposits"
      @close="isDisplayCreateDeposits = false"
    />
  </v-dialog>
</template>
