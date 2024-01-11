<script setup>
import { usePaymentStore } from "@/store/payment";

const paymentStore = usePaymentStore();

const getAllPaymentMethod = async () => {
  const res = await paymentStore.getAllPaymentMethodByGuest();
  if (res.data) {
    console.log(res.data);
  }
};

getAllPaymentMethod();
</script>
<template></template>
