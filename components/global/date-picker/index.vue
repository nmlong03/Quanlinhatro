<script setup>
import svgRequired from "@/assets/svg/required.svg";
const props = defineProps({
  required: {
    type: Boolean,
    default: false,
  },
  label: String,
  error: {
    type: String,
    default: "",
  },
  teleport: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: "MM/DD/YYYY",
  },
});

const placeholder = (date) => {
  return convertDateType(date, "DD/MM/YYYY", "Asia/Ho_Chi_Minh");
};
</script>
<template>
  <div>
    <div class="tw-flex tw-gap-x-1" v-if="label">
      <span>
        {{ label }}
      </span>
      <svgRequired v-if="required" class="mt-1" />
    </div>
    <VueDatePicker
      v-bind="$attrs"
      v-on="$listeners"
      class="!tw-pt-1"
      :class="error ? 's-date-picker-error' : 's-date-picker'"
      auto-apply
      :action-row="false"
      allow-prevent-default
      :teleport="teleport"
      :enable-time-picker="false"
      text-input
      :placeholder="placeholder"
    >
      <template #input-icon>
        <v-icon class="icon-stroke-path tw-mx-2" icon="$calendar" />
      </template>
    </VueDatePicker>
    <p v-if="error" class="first-letter:tw-uppercase tw-text-[#E14B4B] tw-pt-1">
      {{ error }}
    </p>
  </div>
</template>
<style>
.s-date-picker {
  input {
    height: 44px;
    border-radius: 10px;
    border: 1px solid #c0c0c0;
  }
}

.s-date-picker-error {
  input {
    height: 44px;
    border-radius: 10px;
    border: 2px solid rgb(239 68 68);

    &:hover {
      border: 2px solid rgb(239 68 68);
    }
  }
}
</style>
