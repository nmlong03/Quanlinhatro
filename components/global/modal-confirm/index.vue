<script setup>
import IconClose from '@/assets/svg/close.svg';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  cancelText: {
    type: String,
    default: 'Hủy',
  },
  okText: {
    type: String,
    default: 'Xác nhận',
  },
});
const emits = defineEmits(['update:modelValue', 'cancel', 'ok']);

const handleToggle = (e) => {
  emits('update:modelValue', e);
};
</script>
<template>
  <v-dialog
    :model-value="modelValue"
    @update:modelValue="handleToggle"
    width="544"
  >
    <div class="modal-confirm">
      <button
        @click="emits('update:modelValue', false)"
        class="modal-confirm__btn-close"
      >
        <IconClose />
      </button>
      <h5 class="modal-confirm__title">{{ title }}</h5>
      <p class="modal-confirm__description">{{ description }}</p>
      <div class="tw-flex tw-gap-3 tw-mt-12">
        <g-button
          variant="bezeled"
          class="tw-w-1/2"
          @click="emits('update:modelValue', false)"
          >{{ cancelText }}</g-button
        >
        <g-button class="tw-w-1/2" @click="emits('ok')">{{ okText }}</g-button>
      </div>
    </div>
  </v-dialog>
</template>
<style lang="scss">
@import url('./index.scss');
</style>
