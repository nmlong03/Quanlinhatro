<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: null,
  },
  options: {
    type: Array,
    default: () => [],
  },
  inline: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: '',
  },
});
const emits = defineEmits('update:modelValue');
const handleChange = (e) => {
  emits('update:modelValue', e);
};
</script>
<template>
  <div
    :class="[
      's-radio-group',
      inline ? 'tw-flex-row tw-flex-wrap' : 'tw-flex-col',
    ]"
  >
    <g-radio
      v-for="item in options"
      :model-value="modelValue"
      @change="handleChange"
      :label="item.label"
      :value="item.value"
      :disabled="disabled"
      :name="name"
    />
  </div>
</template>
<style>
.s-radio-group {
  display: flex;
  gap: 12px 32px;
}
</style>
