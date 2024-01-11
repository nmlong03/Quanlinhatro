<script setup>
import { useGuestStore } from "~/store/guest";
definePageMeta({
  layout: "guest",
});

const guestStore = useGuestStore();

const billInfo = ref([]);

const getBillInfo = async () => {
  const res = await guestStore.guestRoomBill();
  if (res.data) {
    billInfo.value = res.data.data;
  }
};
getBillInfo();
</script>
<template>
  <div class="tw-grid tw-grid-cols-3 tw-gap-5">
    <nuxt-link
      to="thanh-toan"
      class="tw-group tw-relative tw-block tw-h-64 sm:tw-h-80 lg:tw-h-96"
      v-for="(item, index) in billInfo"
    >
      <span
        class="tw-absolute tw-inset-0 tw-border-2 tw-border-dashed tw-border-black tw-rounded-lg"
      >
      </span>

      <div
        :class="[item.isPaid ? 'tw-border-green-600' : 'tw-border-red-600']"
        class="tw-relative tw-flex tw-h-full tw-transform tw-items-end tw-border-2 tw-rounded-lg tw-bg-white tw-transition-transform group-hover:tw--translate-x-2 group-hover:tw--translate-y-2"
      >
        <div
          class="tw-p-4 !tw-pt-0 tw-transition-opacity group-hover:tw-absolute group-hover:tw-opacity-0 sm:tw-p-6 lg:tw-p-8"
        >
          <h2 class="tw-mt-4 tw-text-xl tw-font-medium sm:tw-text-2xl">
            {{ item.type || "Hóa đơn tiền nhà" }}
          </h2>
          <h2 class="tw-mt-4 tw-text-xl tw-font-medium sm:tw-text-2xl">
            {{ item.monthYear }}
          </h2>
        </div>
        <div
          class="tw-absolute tw-p-4 tw-opacity-0 tw-transition-opacity group-hover:tw-relative group-hover:tw-opacity-100 sm:tw-p-6 lg:tw-p-8"
        >
          <h3 class="tw-mt-4 tw-text-xl tw-font-medium sm:tw-text-2xl">
            {{ item.type || "Hóa đơn tiền nhà" }}
          </h3>

          <p class="tw-mt-4 tw-text-sm sm:tw-text-base">
            Tổng hóa đơn: {{ formatCurrency(item.totalBill) }}
          </p>
          <p class="tw-mt-4 tw-text-sm sm:tw-text-base">
            Đã thanh toán: {{ formatCurrency(item.paidAmount) }}
          </p>
          <p class="tw-mt-4 tw-text-sm sm:tw-text-base">
            Dư nợ: {{ formatCurrency(item.remainingAmount) }}
          </p>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>
