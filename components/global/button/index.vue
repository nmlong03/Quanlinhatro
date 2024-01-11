<script setup lang="ts">
const props = defineProps({
  name: { type: String },
  icon: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    validator: (value: string) =>
      ["sm", "md", "lg", "none-size"].includes(value),
    default: "md",
  },
  link: {
    type: Boolean,
    default: false,
  },
  to: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String,
    validator: (value: string) =>
      [
        "filled",
        "bezeled",
        "ghosted",
        "borderless-blue",
        "bezeled-white",
        "borderless-black",
        "outlined",
      ].includes(value),
    default: "filled",
  },
  text: {
    type: Boolean,
    default: false,
  },
  rounded: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
const classes = computed(function () {
  const colorClasses = {
    "btn-filled": props.variant === "filled",
    "btn-bezeled": props.variant === "bezeled",
    "btn-ghosted": props.variant === "ghosted",
    "btn-borderless-blue": props.variant === "borderless-blue",
    "btn-borderless-black": props.variant === "borderless-black",
    "btn-bezeled-white": props.variant === "bezeled-white",
    "btn-outlined": props.variant === "outlined",
  };
  const otherClasses = {
    "btn-rounded": props.rounded,
    "btn-icon": props.icon,
    "btn-text": props.text,
  };
  return {
    ...otherClasses,
    ...(!props.disabled && !props.loading
      ? colorClasses
      : { "btn-disabled": true }),
  };
});
const sizeClasses = computed(function () {
  const value = {
    "btn-size-sm": props.size === "sm",
    "btn-size-md": props.size === "md",
    "btn-size-lg": props.size === "lg",
    "": props.size === "none-size",
  };
  return value;
});
</script>

<template>
  <button
    v-if="!link"
    :class="[
      `${PREFIX_CLASS}btn`,
      'btn-default',
      classes,
      sizeClasses,
      disabled ? '!tw-cursor-default' : 'tw-cursor-pointer',
    ]"
    :disabled="disabled || loading"
    class="hover:tw-opacity-80"
    v-bind="$attrs"
  >
    <div v-if="loading" class="mr-2 loader"></div>
    <span v-if="$slots.prepend" class="btn-prepend">
      <slot name="prepend"></slot>
    </span>
    <slot></slot>
    <span v-if="$slots.append" class="btn-append">
      <slot name="append"></slot>
    </span>
  </button>
  <NuxtLink
    v-else
    :class="[
      `${PREFIX_CLASS}btn`,
      'btn-default',
      classes,
      sizeClasses,
      disabled ? '!tw-cursor-default' : 'tw-cursor-pointer',
    ]"
    :disabled="disabled || loading"
    v-bind="$attrs"
  >
    <div v-if="loading" class="mr-2 loader"></div>
    <span v-if="$slots.prepend" class="btn-prepend">
      <slot name="prepend"></slot>
    </span>
    <slot></slot>
    <span v-if="$slots.append" class="btn-append">
      <slot name="append"></slot>
    </span>
  </NuxtLink>
</template>
<!-- css -->
<style scoped>
@import url("./index.scss");
</style>
