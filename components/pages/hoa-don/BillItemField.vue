<script setup>
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  value: {
    type: String,
    default: ""
  }
});
</script>
<template>
  <div class="tw-w-full tw-flex tw-justify-between">
    <p class="tw-font-bold tw-text-[16px]">{{ label }}</p>
    <p class="tw-font-semibold tw-text-[16px]">
      {{ value }}
    </p>
  </div>
</template>
