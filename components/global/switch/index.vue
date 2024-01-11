<script setup>
const props = defineProps({
  modelValue: {
    default: Boolean,
    default: false,
  },
});
const emits = defineEmits(['update:modelValue']);
//state
const isChecked = ref(false);
//computed

const handleChangeSwitch = () => {
  emits('update:modelValue', !props.modelValue);
};
watch(
  () => props.modelValue,
  (e) => {
    isChecked.value = e;
  },
  { immediate: true },
);
</script>
<template>
  <label class="switch">
    <input type="checkbox" :checked="isChecked" @change.prevent.stop="handleChangeSwitch" />
    <span class="slider round"></span>
  </label>
</template>
<style lang="scss" scoped>
@import url('./index.css');
</style>
