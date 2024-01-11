<script setup>
import GuestSidebar from "@/components/layouts/GuestSidebar/index.vue";
import listMenu from "~/components/layouts/GuestSidebar/menu";
const route = useRoute();
</script>
<template>
  <div
    class="tw-flex tw-h-screen tw-overflow-hidden"
  >
    <GuestSidebar />
    <div
      class="tw-relative tw-flex tw-flex-1 tw-flex-col tw-overflow-y-auto tw-overflow-x-hidden"
    >
      <!-- <Header v-if="!error" /> -->
      <div class="tw-bg-[#F6F6F6] tw-grow tw-pt-5 tw-pb-8 tw-px-8">
        <div v-for="(item, index) in listMenu">
          <div
            class="tw-w-full tw-p-5 tw-rounded-xl tw-bg-white tw-mb-5 tw-flex tw-items-center"
            v-if="route.path == item.path"
          >
            <span class="tw-text-[28px] tw-font-extrabold">{{
              item.text
            }}</span>
          </div>
        </div>
        <slot />
      </div>
    </div>
  </div>
  <!-- <slot v-if="!route.params.motelId" /> -->
</template>
