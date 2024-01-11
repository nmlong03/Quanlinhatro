<script setup>
import LiquidateBillTable from "~/components/pages/hoa-don-thanh-ly/home/LiquidateBillTable.vue";
import { useLiquidateStore } from "@/store/liquidate-bill";

const liquidateStore = useLiquidateStore();

</script>
<template>
  <LiquidateBillTable />
</template>
