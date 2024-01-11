<script setup lang="ts">
import IconDropDown from '@/assets/svg/drop.svg';

const props = defineProps({
  modelValue: {
    type: Object,
    default: null,
  },
  label: {
    type: String,
    default: '',
  },
  items: {
    type: Array,
    default: [],
  },
  required: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: '',
  },
  itemTitle: {
    type: String,
    default: 'title',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['update:modelValue']);

const handleChangeValue = (e: any) => {
  emits('update:modelValue', e);
};
</script>

<template>
  <div class="">
    <div
      class="label-input tw-flex tw-gap-x-1 tw-pb-1"
      :class="disabled ? 'tw-text-[rgba(60,60,67,0.42)]' : ''"
      v-if="label"
    >
      <span>{{ label }}</span>
      <span v-if="required" :class="disabled ? 'tw-text-[rgba(60,60,67,0.42)]' : 'tw-text-[#E14B4B]'">*</span>
    </div>
    <v-autocomplete
      :disabled="disabled"
      class="tw-mt-1"
      :class="error ? 'error-autocomplete' : ''"
      :item-title="itemTitle"
      hide-details
      variant="outlined"
      rounded="10"
      persistent-placeholder
      :menu-icon="IconDropDown"
      return-object
      :items="items"
      @update:model-value="handleChangeValue"
      :model-value="modelValue"
      solo
      :loading="isLoading"
    ></v-autocomplete>
    <p v-if="error" class="first-letter:tw-uppercase tw-text-[#E14B4B] tw-pt-1">
      {{ error }}
    </p>
  </div>
</template>

<style lang="scss">
.error-autocomplete .v-field {
  border: 2px solid rgb(239 68 68);
}
</style>
