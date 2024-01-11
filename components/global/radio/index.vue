<script setup>
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  modelValue: {
    type: String,
    default: "",
  },
  value: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    validator: (value) => ["sm", "md", "lg"].includes(value),
    default: "md",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: "radio",
  },
});
const emits = defineEmits(["update:modelValue", "change"]);

const classes = computed(() => {
  const classSize = {
    "s-radio-size-sm": props.size === "sm",
    "s-radio-size-md": props.size === "md" || !this.size,
    "s-radio-size-lg": props.size === "lg",
  };
  const classDisabled = {
    "s-radio__disabled": props.disabled,
  };
  return { ...classSize, ...classDisabled };
});
const isChecked = computed(() => {
  return props.modelValue === props.value;
});
</script>
<template>
  <label :class="['s-radio', classes]">
    <input
      @change="$emit('change', $event.target.value)"
      :disabled="disabled"
      :checked="isChecked"
      type="radio"
      :value="value"
      :name="name"
      hidden
    />
    <span class="s-radio__checkmark"></span>
    <span class="s-radio__label">{{ label }}</span>
  </label>
</template>
<style lang="scss">
.s-radio {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    &__checkmark {
      border: 2px solid #c8c8c8;
    }
    input:checked ~ &__checkmark {
      background: white;
      border: 5px solid #f88125;
    }
  }
  &__checkmark {
    width: 20px;
    height: 20px;
    display: block;
    background: #f3f3f3;
    border: 1px solid #dcdcdc;
    border-radius: 100%;
  }
  &__label {
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    margin-left: 10px;
    color: #000;
  }
  input:checked ~ &__checkmark {
    background: white;
    border: 5px solid #f88125;
  }
  &__disabled {
    .s-radio__checkmark {
      background: #d9d9d9;
      border: 1px solid #acacac;
    }
    input:checked ~ .s-radio__checkmark {
      background: #d9d9d9;
      border: 5px solid #acacac;
    }
  }
}
</style>
